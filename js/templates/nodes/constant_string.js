// fixed string
// template node
'use strict';

// constructor
function ConstantString (string) {

	// next template node
	this.next = null;

	// generate string
	// add string
	this.generate = function (generator) {
		generator.write (string);
		return this.next;
	};

}

module.exports = ConstantString;
