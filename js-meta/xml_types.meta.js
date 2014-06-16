// xml spec node types
'use strict';

function generateCode (writeLine) {

	var types = [
		'XML_ATTR',
		'XML_TAG'
	];

	function writeCode (item, isLast) {
		writeLine (
			"\t",
			item,
			": '",
			item,
			!isLast ? "\'," : "\'");
	}

	require ('./iterator') (types, writeCode);
}

require ('./generate') (
	'../js/xml/types.meta.base.js',
	'../js/xml/types.js',
	{
		'/* => types here */': generateCode
	}
);
