// parameterizer
'use strict';

// parameterizer constructor
function Parameterizer (defaultValueSupplier, map) {

	// this
	var thisParams = this;

	// generate string
	// set self as new parameterizer of generator
	this.generate = function (generator) {
		thisParams.outer = generator.params;
		generator.params = thisParams;
	};

	// values
	if (map !== undefined) {
		// false values are allowed
		// but must be replaced before calling get
		this.map = map;

	} else {
		this.map = {};
	}

	// default value supplier
	this.defaultValueSupplier = defaultValueSupplier;

	// set value
	this.set = function (key, value) {
		thisParams.map [key] = value;

		return thisParams;
	};

	// get value
	this.get = function (key) {
		var value = thisParams.map [key];

		if (value === undefined) {
			// value is undefined, get default value
			value = thisParams.defaultValueSupplier (key);
		}

		return value;
	};

}

module.exports = Parameterizer;
