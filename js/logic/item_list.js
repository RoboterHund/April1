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
function get_context_param (key) {
	//noinspection JSUnresolvedVariable
	return this.get (key);
}

// item list constructor
function ItemList (args, buffer_params) {

	var item_list = this;

	// key in parameterizer of item array
	var param_key = args [0];

	// item template
	var template;

	// generate template
	// parameterizer key, nested template stored within template
	this.to_template = function (factory) {

		// append self
		factory.append_part (item_list);

		// generate item template

		var item_template_factory =
			new TemplateFactory (buffer_params);

		var ia, na = args.length;
		for (ia = 1; ia < na; ia++) {
			item_template_factory.put_one (args [ia]);
		}

		template = new Template (
			item_template_factory.get_result ());
	};

	// generate string
	// append to string the template
	this.to_string = function (generator) {
		var items = generator.params.get (param_key);
		var ii, ni = items.length;

		var context_params = generator.params;
		var item_params = new Parameterizer (
			get_context_param.bind (context_params));

		generator.params = item_params;
		for (ii = 0; ii < ni; ii++) {
			item_params.map = items [ii];
			template.to_string (generator);
		}

		generator.params = context_params;
	};

}

module.exports = ItemList;
