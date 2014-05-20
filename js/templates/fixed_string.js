// fixed string
'use strict';

// fixed string part constructor
function FixedString (string) {

	// generate template
	// add string
	// this function exists merely for consistency,
	// the real purpose of this class is to store
	// a string to feed string generators
	this.to_template = function (factory) {
		factory.append_string (string);
	};

	// generate string
	// add string
	this.to_string = function (generator) {
		generator.append (string);
	};

}

module.exports = FixedString;
