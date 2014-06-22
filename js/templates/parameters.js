// parameterizer
'use strict';

// parameterizer constructor
function Parameterizer (superior, map) {

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
		this.map = map;

	} else {
		this.map = {};
	}

	// set value
	this.set = function (key, value) {
		thisParams.map [key] = value;

		return thisParams;
	};

	// get value
	this.get = function (key) {
		var value = thisParams.map [key];

		if (value === undefined) {
			value = superior (key);
		}

		return value;
	};

	// get superior parameterizer
	this.getSuperior = function () {
		return superior;
	};

}

module.exports = Parameterizer;
