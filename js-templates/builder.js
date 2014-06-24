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
	if (node.type) {
		this.dispatch [node.type] (this, node.sub);
	} else {
		if (!this.buffer) {
			this.buffer =
				new WritableStreamBuffer (this.bufferParams);
			this.buffer.write (node.toString ());
		}
	}
};

var dispatch = {};

dispatch [types.GROUP] = function (builder, subs) {
	var i;
	var n = subs.length;
	for (i = 0; i < n; i++) {
		builder.build (subs [i]);
	}
};

dispatch [types.INSERT] = function (builder, subs) {
	builder.finishConstant ();
	builder.append (new template.InsertNode (subs));
};

dispatch [types.LIST] = function (builder, subs) {
	builder.finishConstant ();
	var key = subs [0];
	var template = subs [1];
	builder.append (new template.ListNode (key, template));
};

Builder.prototype.dispatch = dispatch;

module.exports = {
	Builder: Builder
};
