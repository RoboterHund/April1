// parameterizer
'use strict';

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
	this.placeholder = placeholder;
}

module.exports = Parameterizer;
