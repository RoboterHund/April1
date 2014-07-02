// output generator
'use strict';

var Parameterizer = require ('./params').Parameterizer;

/**
 * output generator constructor
 * this is a mediator between:
 *  the output consumer,
 *  the template,
 *  the parameterizer
 * @param {Consumer} consumer the output strings consumer,
 *  responsible of assembling the final result
 * @param {TemplateHead} template linked list of template nodes
 *  should be reusable
 * @param {Parameterizer} [params] values used to fill the template
 *  can also be set directly:
 *   output.params = params;
 * @constructor
 */
function Output (consumer, template, params) {
	this.consumer = consumer;
	this.template = template;
	this.params = params;
}

/**
 * generate output:
 *  process template nodes,
 *   including template head
 *  does
 * @param template
 */
Output.prototype.generate = function (template) {
	var node = template || this.template;
	while (node) {
		node = node.out (this);
	}
};

Output.prototype.string = function () {
	this.generate ();
	return this.consumer.getString ();
};

Output.prototype.write = function (data) {
	this.consumer.write (data);
};

Output.prototype.param = function (key) {
	return this.params.get (key);
};

Output.prototype.pushParams = function (map) {
	this.params = new Parameterizer (map, this.params);
};

Output.prototype.setParams = function (map) {
	this.params.map = map;
};

Output.prototype.popParams = function () {
	this.params = this.params.outside;
};

module.exports = {
	Output: Output
};
