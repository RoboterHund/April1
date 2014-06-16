'use strict';

// string generator constructor
function StringGenerator (consumer) {

	// this
	var thisGenerator = this;

	// parameters
	this.params = null;

	// consume input
	// all arguments must implement
	// generate (StringGenerator);
	this.put = function () {
		var ia, na = arguments.length;
		for (ia = 0; ia < na; ia++) {
			arguments [ia].generate (thisGenerator);
		}
	};

	// write string
	this.write = function (string) {
		consumer.write (string);
	};

}

module.exports = StringGenerator;
