//
'use strict';

function TemplateHead () {
	this.next = null;

	this.out = function () {
		return this.next;
	};
}

function StringNode (string) {
	this.next = null;

	this.out = function (output) {
		output.write (this.string);
		return this.next;
	};

	this.string = string;
}

function InsertNode (key) {
	this.next = null;

	this.out = function (output) {
		var value = output.param (this.key);

		if (value.out) {
			output.generate (value);
		} else {
			output.write (value);
		}

		return this.next;
	};

	this.key = key;
}

function ListNode (key, template) {
	this.next = null;

	this.out = function (output) {
		var items = output.param (this.key);
		var i;
		var n = items.length;

		output.pushParams ();
		for (i = 0; i < n; i++) {
			output.setParams (items [i]);
			output.generate (this.template);
		}
		output.popParams ();

		return this.next;
	};

	this.key = key;
	this.template = template;
}

module.exports = {
	TemplateHead: TemplateHead,
	StringNode: StringNode,
	InsertNode: InsertNode,
	ListNode: ListNode
};
