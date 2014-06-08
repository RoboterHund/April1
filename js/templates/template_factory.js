// template factory
'use strict';

var stream_buffers = require ('stream-buffers');

var FixedString = require ('./fixed_string');

// template factory constructor
function TemplateFactory (bufferParams, emitters) {
	// factory
	var factory = this;
	var stringBuffer = null;

	var parts = [];

	// emitters
	this.emitters = emitters;

	// parameterizer
	this.params = {
		get: function (ignore) {
			return undefined;
		}
	};

	// finish pending actions
	var finish = function () {

		// join accumulated fixed string parts
		var fixedString;
		if (stringBuffer) {
			fixedString = stringBuffer.getContentsAsString (
				bufferParams.encoding);
			stringBuffer.destroy ();
			stringBuffer = null;

			if (fixedString.length > 0) {
				// add to template
				parts.push (
					new FixedString (fixedString));
			}
		}
	};

	// consume input
	// one item
	var putOne = function (arg) {
		if (arg.aTemp) {
			// generate template
			arg.aTemp (factory);

		} else {
			// add string
			stringBuffer = stringBuffer
				|| new stream_buffers
					.WritableStreamBuffer (bufferParams);
			stringBuffer.write (arg.toString ());
		}
	};
	this.putOne = putOne;

	// consume input
	// many items
	this.put = function () {
		var ia, na = arguments.length;
		for (ia = 0; ia < na; ia++) {
			putOne (arguments [ia]);
		}
	};

	// add segment of fixed string part
	this.appendString = function (string) {
		stringBuffer = stringBuffer
			|| new stream_buffers
				.WritableStreamBuffer (bufferParams);
		stringBuffer.write (string);
	};

	// add part, not a fixed string
	// the part must implement aStr
	// or the template won't work
	this.appendPart = function (part) {
		finish ();
		parts.push (part);
	};

	// get final result
	// must be the last method called
	this.getResult = function () {
		finish ();
		return parts;
	};
}

module.exports = TemplateFactory;
