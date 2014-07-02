'use strict';

var A = require ('../main');

var template;
var params;
var string;

var expect;

// [*blk* (*item* x,y) ... ]

expect =
	'[*blk* (*item* 1,2) (*item* 3,4) (*blk* X,Y) (*item* 9,42) ] end';

var delim = A.macro ('*');
var label = A.macro (
	delim,
	A.insert ('lbl'),
	delim
);
var listStart = A.macro (
	'items',
	'('
);
var insertY = A.insert ('y');

template = A.template (
	'[',
	label,
	' ',
	A.list (
		listStart,
		label,
		' ',
		A.insert ('x'),
		',',
		insertY,
		') '
	),
	'] ',
	insertY
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
	],
	y: 'end'
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
	'[*nope* ] 0';

string = A.string (template, {
	lbl: 'nope',
	items: [],
	y: 0
});

console.log (expect);
console.log (string);
if (expect === string) {
	console.log ('OK');
} else {
	console.log ('FAIL');
}
