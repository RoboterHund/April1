// templates
// output generators
'use strict';

var dispatch = require ('../dispatch');
var spec = require ('../spec');
var types = require ('../types');

/**
 *
 * @param out
 * @param node
 */
function outputStringNode (out, node) {
	outputString (out, node [1]);
}

/**
 *
 * @param out
 * @param string
 */
function outputString (out, string) {
	out.write (string);
}

/**
 *
 * @param out
 * @param node
 */
function outputInsert (out, node) {
	var key = node [1];
	var value = out.param (key);

	if (spec.isNodeType (value, types.TEMPLATE)) {
		out.generate (value);

	} else {
		out.write (value);
	}
}

/**
 *
 * @param out
 * @param node
 */
function outputList (out, node) {
	var key = node [1];
	var items = out.param (key);

	var template = node [2];

	outputListItems (out, items, template);
}

/**
 *
 * @param out
 * @param items
 * @param template
 */
function outputListItems (out, items, template) {
	out.pushParams ();

	var i;
	var n = items.length;
	for (i = 0; i < n; i++) {
		out.setParams(items [i]);
		out.generate (template);
	}

	out.popParams ();
}

function dispatcher () {
	var disp = dispatch.dispatcher (outputString);

	dispatch.setup (disp, types.STRING, outputStringNode);
	dispatch.setup (disp, types.INSERT, outputInsert);
	dispatch.setup (disp, types.LIST, outputList);

	return disp;
}

module.exports = {
	outputStringNode: outputStringNode,
	outputString: outputString,
	outputInsert: outputInsert,
	outputList: outputList,
	outputListItems: outputListItems,
	dispatcher: dispatcher,
	dispatch: dispatcher ()
};
