//
'use strict';

var types = require ('./types');

function specNode (type) {
	return expandSub ([type], arguments);
}

function expandSub (sub, args) {
	var i;
	var n = args.length;
	var arg;
	for (i = 1; i < n; i++) {
		arg = args [i];
		if (arg [0] === types.MACRO) {
			expandSub (sub, arg);
		} else {
			sub.push (arg);
		}
	}
	return sub;
}

function nodeBuilder (type) {
	return specNode.bind (null, type);
}

var macro = nodeBuilder (types.MACRO);

module.exports = {
	macro: macro,
	nodeBuilder: nodeBuilder,
	specNode: specNode
};
