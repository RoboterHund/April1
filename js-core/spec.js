//
'use strict';

var types = require ('./types');
var GROUP = types.GROUP;
var TERM = types.TERM;

function appendGroup (head, group) {
	if (group.sub) {
		head.next = group.sub;
		return group.next;
	} else {
		return head;
	}
}

function listArgs (head, args) {
	var n = args.length;
	if (n > 0) {
		var i;
		var arg;
		for (i = 0; i < n; i++) {
			arg = arguments [i];
			if (arg.next) {
				if (arg.type === GROUP) {
					head = appendGroup (head, arg);

				} else {
					head.next = arg;
				}

			} else {
				head.next = {
					type: TERM,
					sub: arg,
					next: null
				};
			}
			head = head.next;
		}

		return head;

	} else {
		return null;
	}
}

function node () {
	var newNode = {
		type: this.type,
		sub: null,
		next: null
	};

	listArgs (this.argHead);
	newNode.sub = this.argHead.next;

	return newNode;
}

function NodeBuilder (type) {
	this.type = type;
	this.node = node.bind (this);
}

NodeBuilder.prototype.argHead = {
	type: null,
	sub: null,
	next: null
};

function define (type) {
	return new NodeBuilder (type);
}

function defineGroupBuilder () {
	var groupBuilder = define (GROUP);

	groupBuilder.node = function () {
		var newNode = {
			type: this.type,
			sub: null,
			next: null
		};

		newNode.next = listArgs (this.argHead);
		newNode.sub = this.argHead.next;

		return newNode;
	}

	return groupBuilder;
}

var group = defineGroupBuilder ();

module.exports = {
	node: node,
	define: define,
	group: group
};
