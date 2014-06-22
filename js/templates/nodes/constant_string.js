// constant string
// template node
'use strict';

/**
 *
 * @param string
 * @constructor
 */
function ConstantString (string) {

	// next template node
	this.next = null;

	// generate string
	// add string
	this.generate = function (consumer) {
		consumer.write (string);
		return this.next;
	};

}

module.exports = ConstantString;
