'use strict';

var stream_buffers = require ('stream-buffers');

// string generator constructor
function StringGenerator (buffer_params) {

	// generator
	var generator = this;

	// string buffer
	var buffer =
		new stream_buffers.WritableStreamBuffer (buffer_params);

	// parameters
	this.params = null;

	// consume input
	// all arguments must implement to_string
	this.put = function () {
		var ia, na = arguments.length;
		for (ia = 0; ia < na; ia++) {
			arguments [ia].to_string (generator);
		}
	};

	// add string
	this.append = function (string) {
		buffer.write (string);
	};

	// get final string
	this.get_result = function () {
		// join string parts
		return buffer.getContentsAsString (buffer_params.encoding);
	};
}

module.exports = StringGenerator;
