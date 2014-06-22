// parameterizer
'use strict';

function Parameterizer (superior, map) {
	this.superior = superior;
	this.map = map;

	this.get = function (key) {
		var value = this.map [key];
		if (value !== undefined) {
			return value;
		} else {
			return(this.superior.get (key));
		}
	};
}

function params (superior, map) {
	return new Parameterizer (superior, map);
}

module.exports = {
	Parameterizer: Parameterizer,
	params: params
};
