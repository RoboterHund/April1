//
'use strict';

var Parameterizer = require ('./params').Parameterizer;

function Output (consumer, template, params) {
	this.consumer = consumer;
	this.params = params;
	this.template = template;
}

Output.prototype.generate = function (template) {
	var node = template || this.template;
	while (node) {
		node = node.out (this);
	}
};

Output.prototype.write = function (string) {
	this.consumer.write (string);
};

Output.prototype.param = function (key) {
	return this.params.get (key);
};

Output.prototype.pushParams = function (superior, map) {
	var params = new Parameterizer (map);
	params.superior (this.params);
	this.params = params;
};

Output.prototype.setParams = function (map) {
	this.params.map = map;
};

Output.prototype.popParams = function () {
	this.params = this.params.superior ();
};

module.exports = {
	Output: Output
};
