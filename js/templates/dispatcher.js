// node => factory dispatcher
'use strict';

/**
 * @param context
 * @param map_class_factory
 * @constructor
 */
function Dispatcher (context, map_class_factory) {

	/**
	 * replace context
	 * @param newContext
	 * @returns {*}
	 */
	this.replaceContext = function (newContext) {
		var prevContext = context;
		context = newContext;
		return prevContext;
	};

	/**
	 *
	 * @param context
	 * @param node
	 */
	this.build = function (node) {
		// build node with the factory that corresponds
		// to its type
		map_class_factory [node.constructor.name]
			.build (context, node);
	};

	/**
	 *
	 * @param context
	 * @param nodes
	 */
	this.buildNodes = function (nodes) {
		var ind, nnd = nodes.length;
		for (ind = 0; ind < nnd; ind++) {
			this.build (nodes[ind]);
		}
	};

}

module.exports = Dispatcher;
