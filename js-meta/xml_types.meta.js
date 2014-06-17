// xml spec node types
'use strict';

var types = [
	'XmlAttr',
	'XmlTag'
];

// generate constructors
function generateConstructors (writeLine) {

	function writeCode (item) {
		writeLine (
			"function ",
			item,
			" (subnodes) { this.sub = subnodes; }");
		writeLine ();
	}

	require ('./iterator') (types, writeCode);
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

	require ('./iterator') (types, writeCode);
}

require ('./generate') (
	'../js/xml/types.meta.base.js',
	'../js/xml/types.js',
	{
		'/* => constructors here */': generateConstructors,
		'/* => exports here */': generateExports
	}
);
