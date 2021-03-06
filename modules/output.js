// output generator
'use strict';

var tempOutput = require ('./templates/output');

var dispatch = require ('./dispatch');
var Parameterizer = require ('./params').Parameterizer;

/**
 * output generator constructor
 * this is a mediator between:
 *  the output consumer,
 *  the template,
 *  the parameterizer
 * @param {Consumer} consumer the output strings consumer,
 *  responsible of assembling the final result
 * @param {Array} template template nodes
 *  should be reusable
 * @param {Parameterizer} [params] values used to fill the template
 *  can also be set directly:
 *   output.params = params;
 * @param getDefault
 * @constructor
 */
function Output (consumer, template, params, getDefault) {
	this.dispatch = tempOutput.dispatch;
	this.consumer = consumer;
	this.template = template;
	this.params = new Parameterizer (params, getDefault);
}

Output.prototype.init = function () {

};

/**
 * output generator constructor wrapper
 * @param {Consumer} consumer passed to constructor
 * @param {Array} template passed to constructor
 * @param {Parameterizer} [params] passed to constructor
 * @param getDefault
 * @returns {Output} initialized output generator
 */
function output (consumer, template, params, getDefault) {
	return new Output (consumer, template, params, getDefault);
}

/**
 * generate output:
 *  process template nodes,
 *   including template head
 *  does not retrieve string from consumer,
 *   so that this method can be called
 *   multiple times, to keep adding content
 *   to the result string
 * @param [template] if not false,
 *  use the provided template instead of the one
 *  attached to this object
 */
Output.prototype.generate = function (template) {
	var nodes = template || this.template;
	dispatch.nodes (
		this, this.dispatch, nodes, 1, nodes.length);
};

/**
 * generate template
 * retrieve string from consumer
 * @returns {string} result string
 */
Output.prototype.string = function () {
	this.generate ();
	return this.consumer.getString ();
};

/**
 * pass data to consumer
 * @param data passed to consumer.write
 */
Output.prototype.write = function (data) {
	this.consumer.write (data);
};

/**
 * get parameter value
 * @param key parameter key
 * @returns {*} the value returned by the parameterizer
 */
Output.prototype.param = function (key) {
	return this.params.get (key);
};

/**
 * push parameterizer onto params stack
 * @param [map] values of new parameterizer
 */
Output.prototype.pushParams = function (map) {
	this.params = new Parameterizer (map, this.params);
};

/**
 * set the values of the top parameterizer of the params stack
 * @param map map of keys to values
 */
Output.prototype.setParams = function (map) {
	this.params.map = map;
};

/**
 * remove top parameterizer from params stack
 */
Output.prototype.popParams = function () {
	this.params = this.params.outside;
};

module.exports = {
	Output: Output,
	output: output
};
