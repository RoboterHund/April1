// buffered writer
'use strict';

var stream_buffers = require ('stream-buffers');

function BufferWriter (bufferParams) {

	this.buffer =
		new stream_buffers
			.WritableStreamBuffer (bufferParams);

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

module.exports = BufferWriter;
