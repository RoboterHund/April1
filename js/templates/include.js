// template field
'use strict';

// include constructor
function Include (key) {

	// include
	var include = this;

	// generate template
	this.aTemp = function (factory) {
		var value = factory.params.get (key);

		if (value !== undefined) {
			// output value given by parameterizer
			factory.put (value);

		} else {
			// output self
			factory.appendPart (include);
		}
	};

	// generate string
	this.aStr = function (generator) {
		var value = generator.params.get (key);
		if (value.aStr) {
			// feed value to generator
			value.aStr (generator);

		} else {
			// assume value is a string
			generator.append (value);
		}
	};

}

module.exports = Include;
