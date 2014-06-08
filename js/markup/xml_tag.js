// xml node
'use strict';

var XmlAttribute = require ('./xml_attr');

// XML tag builder constructor
//
// leading args must be:
// 1: tag name
function XmlTag (args) {

	/**
	 * generate template
	 * @param {TemplateFactory} factory
	 */
	this.aTemp = function (factory) {
		/**
		 * @type {XmlEmitter}
		 */
		var emitter = factory.emitters.xml;

		var name = args [0];
		emitter.start (factory, name);

		var cont_items = [];

		// add attributes
		var ia, na = args.length;
		var arg;
		for (ia = 1; ia < na; ia++) {
			arg = args [ia];

			if (arg instanceof XmlAttribute) {
				// attribute
				emitter.attr (factory, arg);

			} else {
				// content
				cont_items.push (arg);
			}
		}

		if (cont_items.length > 0) {
			// add content
			emitter.endAttrs (factory, false);
			emitter.content (factory, cont_items);
			emitter.endContent (factory, name);

		} else {
			emitter.endAttrs (factory, true);
		}
	};

}

module.exports = XmlTag;
