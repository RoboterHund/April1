// template factory
'use strict';

var stream_buffers = require ('stream-buffers');

var ConstantString = require ('./constant_string');
var Nothing =
	require ('./default_value_suppliers').Nothing;
var TemplateStart = require ('./template_start');

// template factory constructor
function TemplateFactory (bufferParams) {

	// this
	var thisFactory = this;

	var stringBuffer = null;
	var startNode = new TemplateStart ();
	var lastNode = startNode;

	// parameterizer
	this.params = new Nothing ();

	// finish pending actions
	var finish = function () {
		// join accumulated constant string parts
		var fixedString;
		if (stringBuffer) {
			fixedString = stringBuffer.getContentsAsString (
				bufferParams.encoding);
			stringBuffer.destroy ();
			stringBuffer = null;

			if (fixedString.length > 0) {
				// add to template
				lastNode.next = new ConstantString (fixedString);
				lastNode = lastNode.next;
			}
		}
	};

	// consume input
	// one item
	var putOne = function (arg) {
		if (arg.type) {
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
