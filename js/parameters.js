// parameterization module
'use strict';

// placeholders
var placeholders = {

	// placeholder: leaves empty space
	empty_placeholder    : function (ignore) {
		return '';
	},

	// placeholder: not allowed, crash spectacularly
	forbidden_placeholder: function (key) {
		throw new Error ('missing param ' + key);
	},

	// no placeholder: return undefined
	no_placeholder       : function (ignore) {
		return undefined;
	},

	// placeholder: show key for debugging
	debug_placeholder    : function (key) {
		return '<' + key + '>';
	},

	// default placeholder
	default_placeholder  : null
};

// set default placeholder
placeholders.default_placeholder =
	placeholders.forbidden_placeholder;

// parameterizer module
var get_params_module = function (params) {

	// returned module
	var params_module;
	if (params && params.extend) {
		// extend module
		params_module = params.extend;

	} else {
		// new module
		params_module = {};
	}

	// default placeholder
	var default_placeholder =
		(params && params.default_placeholder)
			|| placeholders.default_placeholder;

	// parameterizer constructor
	function Parameterizer (placeholder) {

		// parameterizer
		var params = this;

		// generate template
		// set self as new parameterizer of factory
		this.to_template = function (factory) {
			factory.params = params;
		};

		// generate string
		// set self as new parameterizer of generator
		this.to_string = function (generator) {
			generator.params = params;
		};

		// set value
		this.set = function (key, value) {
			params.map [key] = value;

			// chainable
			return params;
		};

		// get value
		this.get = function (key) {
			var value = params.map [key];

			// value can be anything except undefined
			if (value === undefined) {
				// value is undefined, return placeholder
				value = this.placeholder (key);
			}

			return value;
		};

		// key-value map
		this.map = {};

		// get placeholder value
		this.placeholder =
			placeholder || default_placeholder;
	}

	// check whether is parameterizer
	params_module.is_params = function (arg) {
		return arg instanceof Parameterizer;
	};

	// new parameterizer
	params_module.params = function (placeholder) {
		return new Parameterizer (placeholder);
	};

	// return module
	return params_module;
};

module.exports = {
	placeholders     : placeholders,
	get_params_module: get_params_module
};
