//
'use strict';

var Parameterizer = require ('./params').Parameterizer;

function Output (consumer, template, params) {
	this.consumer = consumer;
	this.template = template;
	this.params = params;
}

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
