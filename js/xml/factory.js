// xml template factory
'use strict';

var types = require ('./types');
var typeUtils = require ('../templates/type_utils');

/**
 * constructor
 * @param {Dispatcher} dispatch
 * @constructor
 */
function XmlFactory (dispatch) {

	// process node
	this.build = function (context, node) {
		var subnodes = node.sub;
		var name = subnodes [0];

		dispatch.build ('<');
		dispatch.build (name);

		var other_items = [];

		// build attributes
		var ip, np = subnodes.length;
		var subnode;
		for (ip = 1; ip < np; ip++) {
			subnode = subnodes [ip];

			if (typeUtils.isType (
				subnode, types.XmlAttr)) {

				dispatch.build (' ');

				// attribute name
				dispatch.build (subnode.sub[0]);

				// attribute value
				var value = subnode.sub[1];
				if (value) {
					dispatch.build ('="');
					dispatch.build (value);
					dispatch.build ('="');
				}
			} else {
				other_items.push (subnode);
			}
		}

		if (other_items.length > 0) {
			// add content
			dispatch.build ('>');
			dispatch.buildNodes (other_items);
			dispatch.build ('</');
			dispatch.build (name);
			dispatch.build ('>');

		} else {
			dispatch.build ('/>');
		}
	};

}

module.exports = XmlFactory;
