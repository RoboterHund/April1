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

module.exports = {
	Parameterizer: Parameterizer
};
