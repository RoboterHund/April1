// xml node
'use strict';

var XmlAttribute = require ('./xml_attr');

// XML tag builder constructor
// 1st argument must be the tag name
function XmlTag (args) {

	/**
	 * generate template
	 * @param {TemplateFactory} factory
	 */
	this.to_template = function (factory) {
		factory.append_string ('<');
		factory.put (args [0]);

		var cont_items = [];

		// add attributes
		var ia, na = args.length;
		var arg;
		for (ia = 1; ia < na; ia++) {
			arg = args [ia];

			if (arg instanceof XmlAttribute) {
				// attribute
				factory.put (arg);

			} else {
				// content
				cont_items.push (arg);
			}
		}

		if (cont_items.length > 0) {
			// add content
			factory.append_string ('>');

			factory.put.apply (null, cont_items);

			factory.put ('</', args [0], '>');

		} else {
			factory.append_string ('/>');
		}
	};

}

module.exports = XmlTag;
