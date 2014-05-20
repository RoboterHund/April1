// template field
'use strict';

// include constructor
function Include (key) {

	// include
	var include = this;

	// generate template
	this.to_template = function (factory) {
		var value = factory.params.get (key);

		if (value !== undefined) {
			// output value given by parameterizer
			factory.put (value);

		} else {
			// output self
			factory.append_part (include);
		}
	};

	// generate string
	this.to_string = function (generator) {
		var value = generator.params.get (key);
		if (value.to_string) {
			// feed value to generator
			value.to_string (generator);

		} else {
			// assume value is a string
			generator.append (value);
		}
	};

}

module.exports = Include;
