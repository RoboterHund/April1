// output consumer
'use strict';

var buffers = require ('stream-buffers');

/**
 * output consumer constructor
 * this consumes the strings that compose the final result
 * @param bufferParams stream buffer params, see stream-buffers docs
 * @constructor
 */
function Consumer (bufferParams) {
	this.bufferParams = bufferParams;
	this.buffer = null;
}

/**
 * initialize output consumer
 * create buffer
 */
Consumer.prototype.init = function () {
	this.buffer =
		new buffers.WritableStreamBuffer (this.bufferParams);
};

/**
 * output consumer constructor wrapper
 * @param bufferParams passed to constructor
 * @returns {Consumer} initialized consumer
 */
function consumer (bufferParams) {
	var ret = new Consumer (bufferParams);
	ret.init ();
	return ret;
}

/**
 * consume string
 * this implementation appends data.toString() to internal buffer
 * @param data object with toString property
 */
Consumer.prototype.write = function (data) {
	this.buffer.write (data.toString ());
};

/**
 * get string in buffer
 * destroy buffer
 * @returns {string} the result string
 */
Consumer.prototype.getString = function () {
	var string =
		this.buffer.getContentsAsString (
			this.bufferParams.encoding);

	this.buffer.destroy ();
	this.buffer = null;

	return string;
};

module.exports = {
	Consumer: Consumer,
	consumer: consumer
};
