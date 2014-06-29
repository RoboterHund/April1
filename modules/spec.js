//
'use strict';

var types = require ('./types');
var TERM = types.TERM;

function SpecNode (type, sub) {
	this.type = type;
	this.sub = sub;
}

function specNode (type, args) {
	var n = args.length;
	var i;
	var arg;
	for (i = 0; i < n; i++) {
		arg = args [i];
		if (!(arg instanceof SpecNode)) {
			args [i] = new SpecNode (TERM, arg);
		}
	}

	return new SpecNode (type, args);
}

function nodeBuilder () {
	return specNode (this, arguments);
}

function createNodeBuilder (type) {
	return nodeBuilder.bind (type);
}

function termArg (sub, index) {
	return sub [index].sub;
}

module.exports = {
	createNodeBuilder: createNodeBuilder,
	nodeBuilder: nodeBuilder,
	SpecNode: SpecNode,
	specNode: specNode,
	termArg: termArg
};
