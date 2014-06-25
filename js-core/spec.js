//
'use strict';

var types = require ('./types');
var MACRO = types.MACRO;
var TERM = types.TERM;

function BaseNode (type, sub) {
	this.type = type;
	this.sub = sub;
}

function SpecNode (type, sub) {
	this.type = type;
	this.sub = sub;
	this.next = null;
}

function prepare (node) {
	if (node instanceof BaseNode) {
		var head = new SpecNode (null, null);
		expand (head, node.sub);

		if (node.type === MACRO) {
			return head.next;

		} else {
			return new SpecNode (node.type, head.next);
		}

	} else {
		return new SpecNode (types.TERM, node);
	}
}

function expand (prev, subs) {
	var i;
	var n = subs.length;
	var sub;
	for (i = 0; i < n; i++) {
		sub = subs [i];

		if (sub instanceof BaseNode) {
			if (sub.type === MACRO) {
				prev = expand (prev, sub.sub);

			} else {
				var subhead = new SpecNode (null, null);
				expand (subhead, sub.sub);
				prev.next = new SpecNode (sub.type, subhead.next);
			}

		} else {
			prev.next = new SpecNode (TERM, sub);
		}

		prev = prev.next;
	}

	return prev;
}

module.exports = {
	BaseNode: BaseNode,
	SpecNode: SpecNode,
	prepare: prepare
};
