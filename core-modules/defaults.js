// template field default value suppliers
'use strict';

var Parameterizer = require ('./params').Parameterizer;

var emptyParams = new Parameterizer (null, null);

// empty string
function EmptyString () {
	this.get = function (ignore) {
		return '';
	};
}
EmptyString.prototype = emptyParams;

// fail spectacularly
function MissingParamError () {
	this.get = function (key) {
		throw new Error ('missing param ' + key);
	};
}
MissingParamError.prototype = emptyParams;

// undefined
function Nothing () {
	this.get = function (ignore) {
		return undefined;
	};
}
Nothing.prototype = emptyParams;

// show key for debugging
function ShowKey () {
	this.get = function (key) {
		return '{$' + key + '}';
	};
}
ShowKey.prototype = emptyParams;

module.exports = {
	EmptyString: EmptyString,
	MissingParamError: MissingParamError,
	Nothing: Nothing,
	ShowKey: ShowKey
};
