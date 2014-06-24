//
'use strict';

var types = require ('./types');
var GROUP = types.GROUP;
var SENTINEL = types.SENTINEL;
var TERM = types.TERM;

function createNode (type, sub) {
    return {
        type: type,
        sub: sub,
        last: null,
        next: null
    };
}

function appendGroup (head, group) {
	if (group.sub) {
		head.next = group.sub;
        return group.last;
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
                head.next = createNode (TERM, arg);
			}
			head = head.next;
		}

		return head;

	} else {
		return null;
	}
}

function node () {
    var newNode = createNode (this.type, null);

    newNode.last = listArgs (this.argHead);
	newNode.sub = this.argHead.next;

	return newNode;
}

function NodeBuilder (type) {
	this.type = type;
	this.node = node.bind (this);
}

NodeBuilder.prototype.argHead =
    createNode (SENTINEL, null);

function define (type) {
	return new NodeBuilder (type);
}


module.exports = {
	node: node,
	define: define,
    group: define (GROUP),
    insert: define (types.INSERT),
    list: define (types.LIST)
};
