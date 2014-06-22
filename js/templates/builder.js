// template factory
'use strict';

var stream_buffers = require ('stream-buffers');

var ConstantString = require ('./nodes/constant_string');
var TemplateStart = require ('./template_start');

var nothing = require ('./defaults').nothing ();
var utils = require ('./utils');

/**
 * template builder constructor
 * @param bufferParams
 * @param {TypeSet} stringTypes
 * @param dispatch
 * @constructor
 */
function TemplateBuilder (
	bufferParams, stringTypes, dispatch) {

	var stringBuffer = null;
	var startNode = new TemplateStart ();
	var lastNode = startNode;

	// parameterizer
	this.params = nothing;

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
	this.build = function (node) {
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
	 *
	 * @param nodes
	 */
	this.buildNodes = utils.bindBuildNodes (this);

	// get template
	// must be the last method called
	this.getTemplate = function () {
		finish ();

		// invalidate self
		lastNode = null;

		return startNode;
	};

}

module.exports = TemplateBuilder;
