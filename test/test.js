// a rather complicated test script,
// designed for good test coverage
'use strict';

var A = require ('../main');

var params;
var string;

var expect;

// test 0
// the test in README

var template = A.template (
	'Hello, ',
	A.insert ('who'),
	'.',
	A.list (
		'then',
		' ',
		A.insert ('item'),
		'.'
	)
);

var values = {
	who: 'World',
	then: [
		{ item: 1 },
		{ item: 2 },
		{ item: 3 }
	]
};

expect = 'Hello, World. 1. 2. 3.';
string =
	A.string (template, values);

console.log (expect);
console.log (string);
if (expect === string) {
	console.log ('OK');
} else {
	console.log ('FAIL');
}

// test 1
// expected output:
expect =
	'[*blk* (*item* 1,2) (*item* 3,4) (*blk* X,Y) (*item* 9,42)] end';

var delim = A.macro ('*');
var label = A.macro (
	delim,
	A.insert ('lbl'),
	delim
);
var listStart = A.macro (
	'items',
	' ('
);
var insertY = A.insert ('y');

template = A.template (
	'[',
	label,
	A.list (
		listStart,
		label,
		' ',
		A.insert ('x'),
		',',
		insertY,
		')'
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

// test 2
// same template as test 1
// expected output:
expect =
	'[*nope*] end: ok';

var endTemplate = A.template (
	'end: ',
	A.insert ('end')
);

string = A.string (template, {
	end: 'ok',
	lbl: 'nope',
	items: [],
	y: endTemplate
});

console.log (expect);
console.log (string);
if (expect === string) {
	console.log ('OK');
} else {
	console.log ('FAIL');
}

// test 3
// same template as test 1
// expected output:
expect =
	'[*nope* (*nope* {$x},42)] end: {$end}';

var stringParams = A.modules.template.defaultStringParams ();
stringParams.getDefault = A.modules.defaults.showKey ();
var stringShowKey = A.modules.template.buildString (stringParams);

string = stringShowKey (template, {
	lbl: 'nope',
	items: [
		{
			y: '42'
		}
	],
	y: endTemplate
});

console.log (expect);
console.log (string);
if (expect === string) {
	console.log ('OK');
} else {
	console.log ('FAIL');
}

// test 4
// custom builder init

var numBuildersExpected = 3;
var numBuildersCreated = 0;

var buildTemplate = A.modules.template.buildTemplate (
	A.modules.template.defaultTemplateParams (),
	function (params) {
		var builder = A.modules.templates.build.templateBuilder (params);
		numBuildersCreated++;
		return builder;
	}
);

template = buildTemplate (
	1,
	A.list (
		'A',
		2
	),
	A.list (
		'B',
		3
	)
);

values = {
	A: [
		{},
		{},
		{}
	],
	B: [
		{},
		{}
	]
};

expect = '122233';
string =
	A.string (template, values);

console.log (expect);
console.log (string);
if (expect === string) {
	console.log ('OK');
} else {
	console.log ('FAIL');
}
console.log (expect);
console.log (string);
console.log ('builders: ' + numBuildersExpected);
console.log ('builders: ' + numBuildersCreated);
if (expect === string
	&& numBuildersExpected === numBuildersCreated) {
	console.log ('OK');
} else {
	console.log ('FAIL');
}
