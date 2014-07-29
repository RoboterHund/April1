// template nodes
'use strict';

var spec = require ('./spec');
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

function stringNode (string) {
	return spec.specNode (types.STRING, string);
}

function outputStringNode (out, node) {
	outputString (out, node [1]);
}

function outputString (out, string) {
	out.append (string);
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

function insertNode (key) {
	return spec.specNode (types.INSERT, key);
}

function outputInsert (out, node) {
	var key = node [1];
	var value = out.param (key);

	if (spec.isNodeType (value, types.TEMPLATE)) {
		out.generate (value);

	} else {
		out.append (value);
	}
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

function listNode (key, template) {
	return spec.specNode (types.LIST, key, template);
}

function outputList (out, node) {
	var key = node [1];
	var items = out.param (key);

	var template = node [2];

	outputListItems (out, items, template);
}

function outputListItems (out, items, template) {
	out.pushParams ();
	var i;
	var n = items.length;
	for (i = 0; i < n; i++) {
		out.setParams (items [i]);
		out.generate (template);
	}
	out.popParams ();
}

module.exports = {
	StringNode: StringNode,
	InsertNode: InsertNode,
	ListNode: ListNode,

	stringNode: stringNode,
	insertNode: insertNode,
	listNode: listNode,

	outputStringNode: outputStringNode,
	outputString: outputString,
	outputInsert: outputInsert,
	outputList: outputList,
	outputListItems: outputListItems
};
