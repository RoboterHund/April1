//
'use strict';

var buffers = require ('stream-buffers');

function Consumer (bufferParams) {
    this.buffer = new buffers.WritableStreamBuffer (bufferParams);

	this.write = function (string) {
		this.buffer.write (string);
	};

	this.getString = function () {
		var string =
			this.buffer.getContentsAsString (
				bufferParams.encoding);

		this.buffer.destroy ();
		this.buffer = null;

		return string;
	};
}

module.exports = {
	Consumer: Consumer
};
