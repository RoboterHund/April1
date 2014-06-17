// template factory
'use strict';

var stream_buffers = require ('stream-buffers');

var typeUtils = require ('./type_utils');

var ConstantString = require ('./nodes/constant_string');
var Dispatcher = require ('./dispatcher');
var Nothing =
	require ('./default_value_suppliers').nothing ();
var TemplateStart = require ('./template_start');

/**
 * template factory constructor
 * @param bufferParams
 * @param {TypeSet} stringTypes
 * @param dispatch
 * @constructor
 */
function TemplateFactory (
	bufferParams, stringTypes, dispatch) {

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

	// process node
	this.build = function (context, node) {
		if (stringTypes.includes (node)) {
			stringBuffer = stringBuffer
				|| new stream_buffers
					.WritableStreamBuffer (bufferParams);
			stringBuffer.write (node.toString ());

		} else {
			dispatch.build (node);
		}
	};

	/**
	 * process nodes
	 * @param context
	 * @param nodes
	 */
	this.buildNodes = function (context, nodes) {
		var ind, nnd = nodes.length;
		for (ind = 0; ind < nnd; ind++) {
			this.build (context, nodes[ind]);
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
