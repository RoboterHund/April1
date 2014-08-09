//
'use strict';

var types = require ('./types');

var Type = types.Type;

var DISPATCH_KEY = 'dispatch';

/**
 *
 * @param other
 * @returns {{}}
 */
function dispatcher (other) {
	return {
		other: other
	};
}

/**
 *
 * @param dispatcher
 * @param type
 * @param toFunction
 */
function setup (dispatcher, type, toFunction) {
	dispatcher [type.id] = toFunction;
}

/**
 *
 * @param key
 * @returns {Function}
 */
function process (key) {
	/**
	 *
	 * @param pro
	 * @param nodes
	 * @param i
	 * @param to
	 */
	return function doProcess (pro, nodes, i, to) {
		var dispatch = pro [key];
		processNodes (pro, dispatch, nodes, i, to);
	};
}

/**
 *
 * @param pro
 * @param dispatch
 * @param nodes
 * @param i
 * @param to
 */
function processNodes (pro, dispatch, nodes, i, to) {
	var other = dispatch.other;

	var node;
	var func;
	for (; i < to; i++) {
		node = nodes [i];

		func = toFunction (dispatch, node);
		if (func) {
			func (pro, node);

		} else {
			other (pro, node);
		}
	}
}

/**
 *
 * @param pro
 * @param dispatch
 * @param node
 */
function processNode (pro, dispatch, node) {
	var func = toFunction (dispatch, node);
	if (func) {
		func (pro, node);

	} else {
		dispatch.other (pro, node);
	}
}

/**
 *
 * @param dispatch
 * @param node
 */
function toFunction (dispatch, node) {
	if (node instanceof Array) {
		var type = node [0];
		if (type instanceof Type) {
			return dispatch [type.id];
		}
	}

	return null;
}

module.exports = {
	DISPATCH_KEY: DISPATCH_KEY,
	dispatcher: dispatcher,
	setup: setup,

	defineProcess: process,
	process: process (DISPATCH_KEY),

	nodes: processNodes,
	node: processNode,
	toFunction: toFunction
};
