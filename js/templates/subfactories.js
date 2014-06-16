// subfactories
'use strict';

var Context = require ('./context');

/**
 *
 * map of node type to factory
 */
function Subfactories (
	map_type_factory, map_class_factory, context) {

	/**
	 * set context for subsequent subBuild calls
	 * @param parentContext
	 * @param factory
	 */
	this.setContext = function (parentContext, factory) {
		context = new Context (parentContext, factory);
	};

	/**
	 * build node
	 * @param {SpecNode|string} node
	 */
	this.build = function (node) {
		if (node.type) {
			// build node with the factory that corresponds
			// to its type
			return map_type_factory [node.type]
				.build (context, node);

		} else {
			// build terminal with the terminal-consuming factory
			return terminalFactory.build (
				context, node);
		}
	};

	/**
	 * build nodes
	 * @param {Array} node
	 */
	this.buildNodes = function (nodes) {
		nodes.forEach (this.build);
	};

}

module.exports = Subfactories;
