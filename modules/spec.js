// spec nodes
'use strict';

var types = require ('./types');

var Type = types.Type;

/**
 *
 * @param {Type} type
 * @param {Array} args
 * @returns {Array}
 */
function specNode (type, args) {
	return expand ([type], args, 0);
}

/**
 * push node items onto the spec node array
 * expand macros
 * @param {Array} node the spec node array to be generated
 * @param args node items
 * @param i
 * @returns {Array} the spec node array,
 *  with the items appended
 */
function expand (node, args, i) {
	var n = args.length;
	var arg;
	for (; i < n; i++) {
		arg = args [i];
		if (isNodeType (arg, types.MACRO)) {
			expand (node, arg, 1);

		} else {
			node.push (arg);
		}
	}
	return node;
}

/**
 * create node builder
 * @param type spec node type
 * @returns {Function} function that returns
 *  spec nodes of specified type
 */
function nodeBuilder (type) {
	return function () {
		return specNode (type, arguments);
	};
}

/**
 * macro node builder
 * @type {Function}
 */
var macro = nodeBuilder (types.MACRO);

/**
 *
 * @param node
 * @param {Type} type
 * @returns {boolean}
 */
function isNodeType (node, type) {
	if (node) {
		var nType = node [0];
		return nType instanceof Type
			&& nType.id == type.id;

	} else {
		return false;
	}
}

module.exports = {
	specNode: specNode,
	nodeBuilder: nodeBuilder,
	macro: macro,
	isNodeType: isNodeType
};
