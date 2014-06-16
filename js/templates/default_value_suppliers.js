// template field default value suppliers
'use strict';

// empty string
function EmptyString (ignore) {
	this.get = function () {
		return '';
	};
}

// fail spectacularly
function MissingParamError (key) {
	this.get = function () {
		throw new Error ('missing param ' + key);
	};
}

// undefined
function Nothing (ignore) {
	this.get = function () {
		return undefined;
	};
}

// show key for debugging
function ShowKey (key) {
	this.get = function () {
		return '{$' + key + '}';
	};
}

// get default value supplier
function getDefaultValueSupplier (DefaultValueSupplier) {
	return new DefaultValueSupplier ();
}

//noinspection JSUnusedGlobalSymbols
module.exports = {
	emptyString: getDefaultValueSupplier.bind (
		null, EmptyString),

	missingParamError: getDefaultValueSupplier.bind (
		null, MissingParamError),

	nothing: getDefaultValueSupplier.bind (
		null, Nothing),

	showKey: getDefaultValueSupplier.bind (
		null, ShowKey)
};
