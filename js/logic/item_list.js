// list of items
'use strict';

var Parameterizer = require ('../templates/parameters');
var Template = require ('../templates/template');
var TemplateFactory = require ('../templates/template_factory');

/**
 * when 'this' var is bound to an external parameterizer,
 * the function can be used as a placeholder for another parameterizer,
 * which will then search for missing values in
 * the external parameterizer
 *
 * @param key
 * @returns {*}
 */
function getContextParam (key) {
	//noinspection JSUnresolvedVariable
	return this.get (key);
}

// item list constructor
function ItemList (args, bufferParams) {

	var itemList = this;

	// key in parameterizer of item array
	var paramKey = args [0];

	// item template
	var template;

	// generate template
	// parameterizer key, nested template stored within template
	this.aTemp = function (factory) {

		// append self
		factory.appendPart (itemList);

		// generate item template

		var itemTemplateFactory =
			new TemplateFactory (bufferParams, factory.emitters);

		var ia, na = args.length;
		for (ia = 1; ia < na; ia++) {
			itemTemplateFactory.putOne (args [ia]);
		}

		template = new Template (
			itemTemplateFactory.getResult ());
	};

	// generate string
	// append to string the template
	this.aStr = function (generator) {
		var items = generator.params.get (paramKey);
		var ii, ni = items.length;

		var contextParams = generator.params;
		var itemParams = new Parameterizer (
			getContextParam.bind (contextParams));

		generator.params = itemParams;
		for (ii = 0; ii < ni; ii++) {
			itemParams.map = items [ii];
			template.aStr (generator);
		}

		generator.params = contextParams;
	};

}

module.exports = ItemList;
