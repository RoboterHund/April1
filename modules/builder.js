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
 *  create sub-template builders
 *  switch from one state to another
 *  dispatch spec node types to the builder function that corresponds
 *   to the current state of the builder
 * the actual logic of constructing the template nodes
 *  is defined by the dispatchers
 * note:
 *  template builders should never modify:
 *   any spec node
 *   the state set or any of its dispatchers
 * @param params template builder parameters:
 *  states : map of state to dispatcher
 *  initialState : initial state
 *  buffer: buffer params (see stream-buffers package)
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
 * build nodes in array
 * dispatch each node to the function that corresponds to the node type
 * if such function is not found, dispatch to the default function
 * @param nodes array of spec nodes
 * @param [from] do not process nodes before this index
 *  default: 1
 *   because 0 is the node type,
 *    which must be handled outside
 * @param [to] do not process nodes at this index and beyond
 *  default: nodes.length
 */
TemplateBuilder.prototype
	.build = function (nodes, from, to) {

	var i = from || 1;
	var end = to || nodes.length;
	var node;
	for (; i < end; i++) {
		node = nodes [i];
		var nodeBuilder = this.dispatch [node [0]];
		if (nodeBuilder) {
			nodeBuilder (this, node);
		} else {
			this.dispatch [undefined] (this, node);
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
 *   retrieving the final result
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
 * process 'insert' spec node
 * append 'insert' template node
 * @param builder template builder
 * @param node the spec node
 *  should contain 1 item:
 *   the key of the 'insert' template node
 */
function insert (builder, node) {
	builder.finishPending ();
	builder.append (
		new templateNodes.InsertNode (node [1]));
}

/**
 * process 'list' spec node
 * append 'list' template node
 * @param builder template builder
 * @param node the spec node
 *  should contain at least 2 items:
 *   key of the list items
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
 * interpret node as string,
 *  append it to template
 * @param builder template builder
 * @param node the item to append
 */
function terminal (builder, node) {
	builder.appendConstant (node);
}

module.exports = {
	TemplateBuilder: TemplateBuilder,
	templateBuilder: templateBuilder,
	insert: insert,
	list: list,
	terminal: terminal
};
