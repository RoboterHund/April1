'use strict';

var stream_buffers = require ('stream-buffers');

// string generator constructor
function StringGenerator (bufferParams) {

	// generator
	var generator = this;

	// string buffer
	var buffer =
		new stream_buffers.WritableStreamBuffer (bufferParams);

	// parameters
	this.params = null;

	// consume input
	// all arguments must implement aStr
	this.put = function () {
		var ia, na = arguments.length;
		for (ia = 0; ia < na; ia++) {
			arguments [ia].aStr (generator);
		}
	};

	// add string
	this.append = function (string) {
		buffer.write (string);
	};

	// get final string
	this.getResult = function () {
		// join string parts
		return buffer.getContentsAsString (bufferParams.encoding);
	};
}

module.exports = StringGenerator;
