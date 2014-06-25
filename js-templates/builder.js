//
'use strict';

var core = require ('../core.main');
var template = core.template;
var types = core.types;

var WritableStreamBuffer =
	require ('stream-buffers').WritableStreamBuffer;

function Builder (bufferParams) {
	this.bufferParams = bufferParams;
	this.buffer = null;
	this.head = new template.TemplateHead ();
	this.node = this.head;
}

Builder.prototype.finishConstant = function () {
	if (this.buffer) {
		var string = this.buffer.getContentsAsString (
			this.bufferParams.encoding);
		this.buffer.destroy ();
		this.buffer = null;
		if (string.length > 0) {
			this.append (new template.StringNode (string));
		}
	}
};

Builder.prototype.append = function (node) {
	this.node.next = node;
	this.node = this.node.next;
};

Builder.prototype.build = function (node) {
	while (node) {
		this.dispatch [node.type] (this, node);
		node = node.next;
	}
	return this.head;
};

var dispatch = {};

dispatch [types.INSERT] = function (builder, subs) {
	builder.finishConstant ();
	builder.append (new template.InsertNode (subs));
};

dispatch [types.LIST] = function (builder, subs) {
	builder.finishConstant ();
	var key = subs.sub;
	var template = builder.build (subs.next);
	builder.append (new template.ListNode (key, template));
};

dispatch [types.TERM] = function (builder, arg) {
	if (!builder.buffer) {
		builder.buffer =
			new WritableStreamBuffer (this.bufferParams);
	}
	builder.buffer.write (arg.toString ());
};

Builder.prototype.dispatch = dispatch;

module.exports = {
	Builder: Builder
};
