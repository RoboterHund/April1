// template field default value suppliers
'use strict';

var Parameterizer = require ('./params').Parameterizer;

// empty string
function emptyString () {
	var params = new Parameterizer (null, null);
	params.get = function (ignore) {
		return '';
	};
	return params;
}

// fail spectacularly
function missingParamError () {
	var params = new Parameterizer (null, null);
	params.get = function (key) {
		throw new Error ('missing param ' + key);
	};
	return params;
}

// undefined
function nothing () {
	var params = new Parameterizer (null, null);
	params.get = function (ignore) {
		return undefined;
	};
	return params;
}

// show key for debugging
function showKey () {
	var params = new Parameterizer (null, null);
	params.get = function (key) {
		return '{$' + key + '}';
	};
	return params;
}

module.exports = {
	emptyString: emptyString,
	missingParamError: missingParamError,
	nothing: nothing,
	showKey: showKey
};
