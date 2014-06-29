// parameterizer
'use strict';

function Parameterizer (map, outside) {
	this.map = map;
	this.outside = outside;
}

Parameterizer.prototype.get = function (key) {
	var value = this.map [key];
	if (value !== undefined) {
		return value;
	} else {
		return this.outside.get (key);
	}
};

function params (map, outside) {
	return new Parameterizer (map, outside);
}

module.exports = {
	Parameterizer: Parameterizer,
	params: params
};
