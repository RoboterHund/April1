var A = require ('../main');

var template;
var params;
var string;

// [*blk* (*item* x,y) ... ]

var delim = A.macro ('*');
var label = A.macro (
	delim,
	A.insert ('lbl'),
	delim,
	' '
);

template = A.template (
	'[',
	label,
	'\n',
	A.list (
		'items',
		'\t(',
		label,
		A.insert ('x'),
		',',
		A.insert ('y'),
		')\n'
	),
	']\n'
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

console.log (string);
