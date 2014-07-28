// template nodes
'use strict';

var types = require ('./types');

/**
 * string node
 * @param string data to output
 * @constructor
 */
function StringNode (string) {
	this.out = function (output) {
		output.write (this.string);
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
	this.out = function (output) {
		var value = output.param (this.key);

		if (value.length && value [0] === types.TEMPLATE) {
			output.generate (value);
		} else {
			output.write (value);
		}
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
	};

	this.key = key;
	this.template = template;
}

module.exports = {
	StringNode: StringNode,
	InsertNode: InsertNode,
	ListNode: ListNode
};
