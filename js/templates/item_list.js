// list of items
// template node
'use strict';

var Parameterizer = require ('./parameters');
var Template = require ('template');
var TemplateFactory = require ('template_factory');

// item list constructor
function ItemList (paramKey, template) {

	// next template node
	this.next = null;

	// generate items
	this.generate = function (generator) {
		var items = generator.params.get (paramKey);
		var ii, ni = items.length;

		var outerParams = generator.params;
		var itemParams =
			new Parameterizer (outerParams, null);
		generator.params = itemParams;

		for (ii = 0; ii < ni; ii++) {
			itemParams.map = items [ii];
			template.generate (generator);
		}

		generator.params = outerParams;

		return this.next;
	};

}

module.exports = ItemList;
