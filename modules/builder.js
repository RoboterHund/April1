//
'use strict';

var spec = require ('./spec');
var templateNodes = require ('./template_nodes');

var WritableStreamBuffer =
	require ('stream-buffers').WritableStreamBuffer;

function TemplateBuilder (params) {
	this.params = params;
	this.states = null;
	this.dispatch = null;
	this.head = null;
	this.node = null;
	this.buffer = null;
}

TemplateBuilder.prototype.init = function () {
	this.states = this.params.states;
	this.setState (this.params.initialState);
	this.head = new templateNodes.TemplateHead ();
	this.node = this.head;
};

function templateBuilder (params) {
	var builder = new TemplateBuilder (params);
	builder.init ();
	return builder;
}

TemplateBuilder.prototype.setState = function (state) {
	this.dispatch = this.states [state];
};

TemplateBuilder.prototype
	.build = function (nodes, from, to) {

	var i = from || 0;
	var end = to || nodes.length;
	var node;
	while (i < end) {
		node = nodes [i];
		this.dispatch [node.type] (this, node.sub);
		i++;
	}
};

TemplateBuilder.prototype
	.getTemplate = function () {

	this.finishConstant ();
	return this.head;
};

TemplateBuilder.prototype
	.append = function (node) {

	this.node.next = node;
	this.node = node;
};

TemplateBuilder.prototype
	.appendConstant = function (constant) {

	if (!this.buffer) {
		this.buffer =
			new WritableStreamBuffer (this.params.buffer);
	}
	this.buffer.write (constant.toString ());
};

TemplateBuilder.prototype
	.finishConstant = function () {

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

TemplateBuilder.prototype
	.getSubBuilder = function () {

	return templateBuilder (this.params);
};

function insert (builder, sub) {
	builder.finishConstant ();
	builder.append (
		new templateNodes.InsertNode (
			spec.termArg (sub, 0)));
}

function list (builder, sub) {
	builder.finishConstant ();
	var key = spec.termArg (sub, 0);
	var subBuilder = builder.getSubBuilder ();
	subBuilder.build (sub, 1);
	var template = subBuilder.getTemplate ();
	builder.append (new templateNodes.ListNode (key, template));
}

function macro (builder, sub) {
	builder.build (sub);
}

function term (builder, sub) {
	builder.appendConstant (sub);
}

module.exports = {
	TemplateBuilder: TemplateBuilder,
	templateBuilder: templateBuilder,
	insert: insert,
	list: list,
	macro: macro,
	term: term
};
