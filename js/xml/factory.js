// xml template factory
'use strict';

// node types
var types = require ('./types');

/**
 * constructor
 * @param {Subfactories} sub
 * @constructor
 */
function XmlFactory (sub) {

	// this
	var thisFactory = this;

	// template
	this.template = null;

	// subnode factories

	// build template
	this.build = function (context, node) {
		if (node.type === types.XML_TAG) {
			sub.setContext (context, thisFactory);

			var nodeSub = node.sub;
			var name = nodeSub [0];

			sub.build ('<');
			sub.build (name);

			var other_items = [];

			// build attributes
			var ip, np = nodeSub.length;
			var param;
			for (ip = 1; ip < np; ip++) {
				param = nodeSub [ip];

				if (param.type === types.XML_ATTR) {
					sub.build (' ');

					// attribute name
					sub.build (param.sub[0]);

					// attribute value
					var value = param.sub[1];
					if (value) {
						sub.build ('="');
						sub.build (value);
						sub.build ('="');
					}
				} else {
					other_items.push (param);
				}
			}

			if (other_items.length > 0) {
				// add content
				sub.build ('>');
				sub.buildNodes (other_items);
				sub.build ('</');
				sub.build (name);
				sub.build ('>');

			} else {
				subBuild ('/>');
			}
		}
	};

}

module.exports = XmlFactory;
