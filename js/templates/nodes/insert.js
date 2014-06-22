// template insertion field
// template node
'use strict';

// constructor
function Insert (key) {

	// next node
	this.next = null;

	// generate value
	this.generate = function (consumer) {
		var value = consumer.params.get (key);
		if (value.generate) {
			value.generate (consumer);

		} else {
			// assume value is a string
			consumer.write (value);
		}

		return this.next;
	};

}

module.exports = Insert;
