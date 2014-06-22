// xml template factory
'use strict';

var types = require ('./types');
var utils = require ('../templates/utils');

/**
 * constructor
 * @param {Dispatcher} dispatch
 * @constructor
 */
function XmlBuilder (dispatch) {

	// process node
	this.build = function (node) {
		var subnodes = node.sub;
		var name = subnodes [0];

		var stringBuilder = dispatch.getNodeBuilder (node);

		stringBuilder.build ('<');
		dispatch.build (name);

		var other_items = [];

		// build attributes
		var ip, np = subnodes.length;
		var subnode;
		for (ip = 1; ip < np; ip++) {
			subnode = subnodes [ip];

			if (utils.isType (subnode, types.XmlAttr)) {

				stringBuilder.build (' ');

				// attribute name
				dispatch.build (subnode.sub[0]);

				// attribute value
				var value = subnode.sub[1];
				if (value) {
					stringBuilder.build ('="');
					dispatch.build (value);
					stringBuilder.build ('="');
				}
			} else {
				other_items.push (subnode);
			}
		}

		if (other_items.length > 0) {
			// add content
			stringBuilder.build ('>');
			dispatch.buildNodes (other_items);
			stringBuilder.build ('</');
			dispatch.build (name);
			stringBuilder.build ('>');

		} else {
			stringBuilder.build ('/>');
		}
	};

	/**
	 *
	 * @param nodes
	 */
	this.buildNodes = utils.bindBuildNodes (this);

}

module.exports = XmlBuilder;
