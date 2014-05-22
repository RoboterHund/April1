// template item group
// holds an array of template items
// so that they can be reused
'use strict';

// template item group constructor
function TemplateItemGroup (items) {

	/**
	 *
	 * @param {TemplateFactory} factory
	 */
	this.to_template = function (factory) {
		factory.put.apply (null, items);
	};

}

module.exports = TemplateItemGroup;
