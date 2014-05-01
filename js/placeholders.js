// template value placeholders
'use strict';

//noinspection JSUnusedGlobalSymbols
module.exports = {

	// placeholder: leaves empty space
	empty_placeholder    : function empty_placeholder (ignore) {
		return '';
	},

	// placeholder: not allowed, crash spectacularly
	forbidden_placeholder: function forbidden_placeholder (key) {
		throw new Error ('missing param ' + key);
	},

	// no placeholder: return undefined
	no_placeholder       : function no_placeholder (ignore) {
		return undefined;
	},

	// placeholder: show key for debugging
	debug_placeholder    : function debug_placeholder (key) {
		return '{$' + key + '}';
	}

};
