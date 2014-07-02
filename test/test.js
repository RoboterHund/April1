'use strict';

var A = require ('../main');

var template;
var params;
var string;

var expect;

// [*blk* (*item* x,y) ... ]

expect = '[*blk* (*item* 1,2) (*item* 3,4) (*blk* X,Y) (*item* 9,42) ]';

var delim = A.macro ('*');
var label = A.macro (
	delim,
	A.insert ('lbl'),
	delim
);

template = A.template (
	'[',
	label,
	' ',
	A.list (
		'items',
		'(',
		label,
		' ',
		A.insert ('x'),
		',',
		A.insert ('y'),
		') '
	),
	']'
);

var ITEM = 'item';
params = {
	lbl: 'blk',
	items: [
		{
			lbl: ITEM,
			x: 1,
			y: 2
		},
		{
			lbl: ITEM,
			x: 3,
			y: 4
		},
		{
			x: 'X',
			y: 'Y'
		},
		{
			lbl: ITEM,
			x: 9,
			y: 42
		}
	]
};

string = A.string (template, params);

console.log (expect);
console.log (string);
if (expect === string) {
	console.log ('OK');
} else {
	console.log ('FAIL');
}

expect =
	'[*nope* ]';

string = A.string (template, {
	lbl: 'nope',
	items: []
});

console.log (expect);
console.log (string);
if (expect === string) {
	console.log ('OK');
} else {
	console.log ('FAIL');
}
