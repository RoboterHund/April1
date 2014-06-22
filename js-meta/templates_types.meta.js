// template spec node types
'use strict';

var generate = require ('./types');

var types = [
	'SpecGroup',
	'SpecInsert',
	'SpecList'
];

require ('./generate') (
	'../js/templates/types.meta.base.js',
	'../js/templates/types.js',
	{
		'/* => constructors here */': generate.constructors (types),
		'/* => exports here */': generate.exports (types)
	}
);
