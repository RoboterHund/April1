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
		var other = dispatch.other;

		var node;
		var type;
		var toFunction;
		for (; i < to; i++) {
			node = nodes [i];

			toFunction = false;
			if (node instanceof Array) {
				type = node [0];
				if (type instanceof Type) {
					toFunction = dispatch [type.id];
				}
			}

			if (toFunction) {
				toFunction (pro, node);

			} else {
				other (pro, node);
			}
		}
	};
}

module.exports = {
	DISPATCH_KEY: DISPATCH_KEY,
	dispatcher: dispatcher,
	setup: setup,
	defineProcess: process,
	process: process (DISPATCH_KEY)
};
