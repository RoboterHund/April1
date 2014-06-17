// template field
// template node
'use strict';

// constructor
function Include (key) {

	// next node
	this.next = null;

	// generate value
	this.generate = function (generator) {
		var value = generator.params.get (key);
		if (value.generate) {
			value.generate (generator);

		} else {
			// assume value is a string
			generator.write (value);
		}

		return this.next;
	};

}

module.exports = Include;
