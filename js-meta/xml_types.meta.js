// xml spec node types
'use strict';

var generate = require ('./types');

var types = [
	'XmlAttr',
	'XmlTag'
];

require ('./generate') (
	'../js/xml/types.meta.base.js',
	'../js/xml/types.js',
	{
		'/* => constructors here */': generate.constructors (types),
		'/* => exports here */': generate.exports (types)
	}
);
