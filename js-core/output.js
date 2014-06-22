//
'use strict';

var parameterizer = require ('./params').params;

function Output (consumer, params) {
	this.consumer = consumer;
	this.params = params;
}

Output.prototype.write = function (string) {
	this.consumer.write (string);
};

Output.prototype.param = function (key) {
	return this.params.get (key);
};

Output.prototype.pushParams = function () {
	var newParams = parameterizer (this.params);
	this.params = newParams;
};

Output.prototype.setParams = function (map) {
	this.params.map = map;
};

Output.prototype.popParams = function () {
	this.params = this.params.superior;
};

module.exports = {
	Output: Output
};
