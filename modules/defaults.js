// template field default value suppliers
'use strict';

var Parameterizer = require ('./params').Parameterizer;

/**
 * placeholder:
 *  empty string
 * @returns {Parameterizer} get() returns empty string,
 *  regardless of key
 */
function emptyString () {
	var params = new Parameterizer (null, null);
	params.get = function (ignore) {
		return '';
	};
	return params;
}

/**
 * placeholder:
 *  missing param error
 * @returns {Parameterizer} get() throws error
 */
function missingParamError () {
	var params = new Parameterizer (null, null);
	params.get = function (key) {
		throw new Error ('missing param ' + key);
	};
	return params;
}

/**
 * placeholder:
 *  undefined
 * @returns {Parameterizer} get() always returns undefined
 */
function nothing () {
	var params = new Parameterizer (null, null);
	params.get = function (ignore) {
		return undefined;
	};
	return params;
}

/**
 * placeholder:
 *  show key for debugging
 * @returns {Parameterizer} get() returns a string
 *  that contains the key
 */
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
