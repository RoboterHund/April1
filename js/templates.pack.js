// pack
// templates
// parameterizer
// linked list
'use strict';

var import_list = require ('./linked_list');
var import_params = require ('./parameters');
var import_templates = require ('./templates');

var get_pack = function (params) {

	var L = import_list.get_linked_list_module ();

	var P = import_params.get_params_module (
		{
			default_placeholder: (params && params.default_placeholder)
				|| import_params.placeholders.default_placeholder,

			extend: L
		});

	var T = import_templates.get_templates_module (
		{
			list_module: L,

			extend: P
		});

	return T;
};

module.exports = {
	modules : {
		linked_list: import_list,
		params     : import_params,
		templates  : import_templates
	},
	get_pack: get_pack
};
