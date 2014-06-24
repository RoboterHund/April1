//
'use strict';

var core = require ('../core.main');
var defaults = core.defaults;
var spec = core.spec;
var template = core.template;
var types = core.types;

function TemplateBuilder (bufferParams) {
    this.bufferParams = bufferParams;
    this.buffer = null;
    this.head = new template.TemplateHead ();
    this.node = this.head;
}

TemplateBuilder.prototype.finishConstant = function () {
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

TemplateBuilder.prototype.append = function (node) {
    this.node.next = node;
    this.node = this.node.next;
};

TemplateBuilder.prototype.build = function () {

};

var dispatch = {};

dispatch [types.GROUP] = function (builder, node) {
    var sub = node.sub;
    while (sub) {
        builder.dispatch (builder, node);
        sub = sub.next;
    }
};

dispatch [types.INSERT] = function (builder, node) {
    builder.finishConstant ();
    builder.append (new template.InsertNode (node.sub));
};

dispatch [types.LIST] = function (builder, node) {
    builder.finishConstant ();
    var
        builder
    .
    append (new template.ListNode ())
};

dispatch [types.TERM] = function (builder, node) {
};

TemplateBuilder.prototype.dispatch = dispatch;

module.exports = {

};
