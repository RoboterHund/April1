//
'use strict';

function StringNode (next, string) {
	this.next = next;

	this.out = function (output) {
		output.write (this.string);
		return this.next;
	};

	this.string = string;
}

function InsertNode (next, key) {
	this.next = next;

	this.out = function (output) {
		var value = output.param (this.key);

		if (value.out) {
			value.out (output);
		} else {
			output.write (value);
		}

		return this.next;
	};

	this.key = key;
}

function ListNode (next, key, template) {
	this.next = next;

	this.out = function (output) {
		var items = output.param (this.key);
		var i, n = items.length;

		output.pushParams ();
		for (i = 0; i < n; i++) {
			output.setParams (items [i]);
			this.template.out (output);
		}
		output.popParams ();

		return this.next;
	};

	this.key = key;
	this.template = template;
}

module.exports = {
	string: StringNode,
	insert: InsertNode,
	list: ListNode
};
