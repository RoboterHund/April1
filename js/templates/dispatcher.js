// node => builder dispatcher
'use strict';

var utils = require ('./utils');

/**
 * @param map_type_builder
 * @constructor
 */
function Dispatcher (map_type_builder) {

	/**
	 *
	 * @param node
	 * @returns {*}
	 */
	this.getNodeBuilder = function (node) {
		return map_type_builder [utils.nodeType (node)];
	};

	/**
	 *
	 * @param node
	 */
	this.build = function (node) {
		// build node with the factory that corresponds
		// to its type
		map_type_builder [utils.nodeType (node)]
			.build (node);
	};

	/**
	 *
	 * @param nodes
	 */
	this.buildNodes = utils.bindBuildNodes (this);

}

module.exports = Dispatcher;
