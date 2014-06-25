//
'use strict';

var types = require ('./types');
var MACRO = types.MACRO;
var TERM = types.TERM;

function SpecNode (type, head, tail) {
	this.type = type;
	this.head = head;
	this.tail = tail;
	this.next = null;
}

function node (type, args) {
	var n = args.length;
	if (n === 0) {
		return new SpecNode (type, null, null);
	}

	var start = new SpecNode ();
	var last = start;
	var i;
	var arg;
	for (i = 0; i < n; i++) {
		arg = args [i];

		if (arg instanceof SpecNode) {
			if (arg.type === MACRO) {
				if (arg.head) {
					last.next = arg.head;
					last = arg.tail;
				}

			} else {
				last.next = arg;
				last = arg;
			}

		} else {
			last.next = new SpecNode (TERM, arg, null);
			last = last.next;
		}
	}

	return new SpecNode (type, start.next, last);
}

module.exports = {
	SpecNode: SpecNode,
	node: node
};
