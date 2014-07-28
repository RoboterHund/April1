// specification nodes
'use strict';

var types = require ('./types');

/**
 * build spec node
 * expand macros
 *  except when the returned node is itself a macro
 * @param type the type of the returned spec node
 *  all other arguments are added as node items
 *  macros are expanded
 * @returns {Array} the spec node, where the first element
 *  is the type
 */
function specNode (type) {
	return expandSub ([type], arguments);
}

/**
 * push node items onto the spec node array
 * expand macros
 * @param {Array} sub the spec node array to be generated
 * @param args node items
 * @returns {Array} the spec node array,
 *  with the items appended
 */
function expandSub (sub, args) {
	var i;
	var n = args.length;
	var arg;
	for (i = 1; i < n; i++) {
		arg = args [i];
		if (arg [0] === types.MACRO) {
			expandSub (sub, arg);
		} else {
			sub.push (arg);
		}
	}
	return sub;
}

/**
 * create node builder
 * @param type the type of spec nodes to generate
 * @returns {Function} a function that will return
 *  a spec node of the specified type,
 *  and with the items provided to the function as argument
 */
function nodeBuilder (type) {
	return function buildNode () {
		return expandSub ([type], arguments);
	};
}

/**
 * macro node builder
 * @type {function(this:null)}
 */
var macro = nodeBuilder (types.MACRO);

module.exports = {
	specNode: specNode,
	nodeBuilder: nodeBuilder,
	macro: macro
};
