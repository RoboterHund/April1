// template builder
'use strict';

var templateNodes = require ('./template_nodes');

var WritableStreamBuffer =
	require ('stream-buffers').WritableStreamBuffer;

/**
 * template builder constructor
 * this converts a tree of spec nodes
 *  into a linked list of template nodes
 * the template builder itself only contains the logic to:
 *  accumulate constant strings (the fixed parts of the template)
 *  append template nodes
 *  create builders for sub-templatest
 *  switch from one state to another
 *  dispatch spec node types to the builder function that corresponds
 *   to the current state of the builder
 * the actual logic of constructing the template nodes
 *  is defined by the dispatchers
 * @param params template builder parameters:
 *  states : map of state to dispatcher
 *  initialState : initial state
 *  buffer: buffer params
 * @constructor
 */
function TemplateBuilder (params) {
	this.params = params;
	this.states = null;
	this.dispatch = null;
	this.head = null;
	this.node = null;
	this.buffer = null;
}

/**
 * initialize template builder
 * must be called before building
 * set initial state & initial dispatcher
 * create template head
 */
TemplateBuilder.prototype.init = function () {
	this.states = this.params.states;
	this.setState (this.params.initialState);
	this.head = new templateNodes.TemplateHead ();
	this.node = this.head;
};

/**
 * template builder constructor wrapper
 * initialize builder
 * @param params passed to constructor
 * @returns {TemplateBuilder} initialized builder
 */
function templateBuilder (params) {
	var builder = new TemplateBuilder (params);
	builder.init ();
	return builder;
}

/**
 * set dispatcher corresponding to new state
 * @param state new state, must be a key in params.states
 */
TemplateBuilder.prototype.setState = function (state) {
	this.dispatch = this.states [state];
};

/**
 * build nodes in array-like object
 * @param nodes array-like object of spec nodes
 *  note:
 *   there is no requirement that it is actually an array
 *    the only requirement is that there is an order,
 *    specified by 0-based indices,
 *    and a length property that indicates the number of nodes
 *   the items must be spec nodes, otherwise the dispatcher
 *    will fail to find the function that will be used
 *    to process the spec node
 * @param [from] do not process nodes before this index
 *  default: 0
 * @param [to] do not process nodes at this index and beyond
 *  default: nodes.length
 */
TemplateBuilder.prototype
	.build = function (nodes, from, to) {

	var i = from || 0;
	var end = to || nodes.length;
	var node;
	for (; i < end; i++) {
		node = nodes [i];
		var nodeBuilder = this.dispatch [node [0]];
		if (nodeBuilder) {
			nodeBuilder (this, node);
		} else {
			constant (this, node);
		}
	}
};

/**
 * finish any pending actions required to build template
 * return the resulting template
 * @returns {TemplateHead} template head
 */
TemplateBuilder.prototype
	.getTemplate = function () {

	this.finishPending ();
	return this.head;
};

/**
 * append template node to list of nodes
 * @param node node to append
 */
TemplateBuilder.prototype
	.append = function (node) {

	this.node.next = node;
	this.node = node;
};

/**
 * append a string to template
 * string is actually added to temporal buffer so that
 *  contiguous strings can be afterwards joined into
 *  a single template node
 * @param constant string to be appended to template
 */
TemplateBuilder.prototype
	.appendConstant = function (constant) {

	if (!this.buffer) {
		this.buffer =
			new WritableStreamBuffer (this.params.buffer);
	}
	this.buffer.write (constant.toString ());
};

/**
 * finish pending actions
 * contiguous strings accumulated in temporal buffer
 *  are joined into a single template node
 * note:
 *  implementations of template builder must call this before:
 *   appending any template node
 *  must be called before retrieving the
 */
TemplateBuilder.prototype
	.finishPending = function () {

	if (this.buffer) {
		var string = this.buffer.getContentsAsString (
			this.params.buffer.encoding);
		this.buffer.destroy ();
		this.buffer = null;
		if (string.length > 0) {
			this.append (new templateNodes.StringNode (string));
		}
	}
};

/**
 * create a template builder
 * @returns {TemplateBuilder} initialized template builder,
 *  with same parameters as this one
 */
TemplateBuilder.prototype
	.getSubBuilder = function () {

	return templateBuilder (this.params);
};

/**
 * process items of 'insert' spec node
 *  the 'insert' template node
 * @param builder template builder
 * @param sub node items array-like object
 *  should contain 1 item:
 *   'term' spec node that will be set as the key of
 *    the 'insert' template node
 */
function insert (builder, node) {
	builder.finishPending ();
	builder.append (
		new templateNodes.InsertNode (node [1]));
}

/**
 * process items of 'list' spec node
 * @param builder template builder
 * @param sub node items array-like object
 *  should contain at least 2 items:
 *   'term' spec node with key that will be used to search for list items
 *   the spec nodes of the template used to render the list items
 */
function list (builder, node) {
	builder.finishPending ();
	var key = node [1];
	var subBuilder = builder.getSubBuilder ();
	subBuilder.build (node, 2);
	var template = subBuilder.getTemplate ();
	builder.append (new templateNodes.ListNode (key, template));
}

/**
 * process terminal spec node
 * @param builder template builder
 * @param sub node items array-like object
 *  should contain 1 item:
 *   the string to append to template
 */
function constant (builder, node) {
	builder.appendConstant (node);
}

module.exports = {
	TemplateBuilder: TemplateBuilder,
	templateBuilder: templateBuilder,
	insert: insert,
	list: list,
	constant: constant
};
