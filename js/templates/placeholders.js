// template field value placeholders
'use strict';

// if using IntelliJ, do not remove JSUnusedGlobalSymbols
// placeholders are not used by April1 itself

// export placeholders
//noinspection JSUnusedGlobalSymbols
module.exports = {

	// empty string
	emptyString: function emptyString (ignore) {
		return '';
	},

	// fail spectacularly
	error: function error (key) {
		throw new Error ('missing param ' + key);
	},

	// undefined
	nothing: function nothing (ignore) {
		return undefined;
	},

	// show key for debugging
	showKey: function showKey (key) {
		return '{$' + key + '}';
	}

};
