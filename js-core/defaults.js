// template field default value suppliers
'use strict';

var Parameterizer = require ('./params').Parameterizer;

// empty string
function emptyString (ignore) {
	return '';
}

// fail spectacularly
function missingParamError (key) {
	throw new Error ('missing param ' + key);
}

// undefined
function nothing (ignore) {
	return undefined;
}

// show key for debugging
function showKey (key) {
	return '{$' + key + '}';
}

function defaults (get) {
	var params = new Parameterizer (null, null);
	params.get = get;
	return params;
}

//noinspection JSUnusedGlobalSymbols
module.exports = {
	emptyString: function () {
		return defaults (emptyString);
	},

	missingParamError: function () {
		return defaults (missingParamError);
	},

	nothing: function () {
		return defaults (nothing);
	},

	showKey: function () {
		return defaults (showKey);
	}
};
