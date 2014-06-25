// parameterizer
'use strict';

function Parameterizer (map) {
	this.superParams = null;
	this.map = map;

	this.get = function (key) {
		var value = this.map [key];
		if (value !== undefined) {
			return value;
		} else {
			return(this.superParams.get (key));
		}
	};
}

Parameterizer.prototype.superior = function (superior) {
	if (superior !== undefined) {
		this.superParams = superior;
	}
	return this.superParams;
};

module.exports = {
	Parameterizer: Parameterizer
};
