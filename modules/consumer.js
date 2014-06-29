//
'use strict';

var buffers = require ('stream-buffers');

function Consumer (bufferParams) {
	this.bufferParams = bufferParams;
	this.buffer = null;

	this.write = function (data) {
		this.buffer.write (data.toString ());
	};
}

Consumer.prototype.init = function () {
	this.buffer =
		new buffers.WritableStreamBuffer (this.bufferParams);
};

Consumer.prototype.getString = function () {
	var string =
		this.buffer.getContentsAsString (
			this.bufferParams.encoding);

	this.buffer.destroy ();
	this.buffer = null;

	return string;
};

function consumer (bufferParams) {
	var ret = new Consumer (bufferParams);
	ret.init ();
	return  ret;
}

module.exports = {
	Consumer: Consumer,
	consumer: consumer
};
