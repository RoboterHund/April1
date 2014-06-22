// types code generator
'use strict';

// generate constructors
function generateConstructors (writeLine) {

	function writeCode (item) {
		writeLine (
			"function ",
			item,
			" (subnodes) { this.sub = subnodes; }");
		writeLine ();
	}

	//noinspection JSHint
	require ('./iterator') (this, writeCode);
}

// generate exports
function generateExports (writeLine) {

	function writeCode (item, isLast) {
		writeLine (
			"\t",
			item,
			": ",
			item,
			!isLast ? "," : "");
	}

	//noinspection JSHint
	require ('./iterator') (this, writeCode);
}

module.exports = {
	constructors: function (types) {
		return generateConstructors.bind (types);
	},
	exports: function (types) {
		return generateExports.bind (types);
	}
};
