// template nodes
'use strict';

/**
 * template head
 * all template nodes have the same interface:
 *  next: the next node in the template nodes linked list
 *  out: function that takes an output generator as argument
 *   and writes the output to it
 * note:
 *  the list of template nodes must be immutable,
 *   so that it can always be reused
 *  the state of the final result generation must
 *   be stored in the output generator
 * @constructor
 */
function TemplateHead () {
	this.next = null;

	this.out = function () {
		return this.next;
	};
}

/**
 * string node
 * @param string data to output
 * @constructor
 */
function StringNode (string) {
	this.next = null;

	this.out = function (output) {
		output.write (this.string);
		return this.next;
	};

	this.string = string;
}

/**
 * insert node
 * @param key key in output generator params stack
 *  expected type:
 *   template (the first template node)
 *   data to output
 * @constructor
 */
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

/**
 * list node
 * @param key key in output generator params stack
 *  expected type:
 *   array of params maps (objects, not parameterizers),
 *    one for each list item
 * @param template the template used to render each item
 * @constructor
 */
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
