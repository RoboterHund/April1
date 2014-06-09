// templates module test
'use strict';

var assert = require ('assert');
var modTest = require ('./test');

var msgAssertExpectedGot = 'should be (expected === got)';

var A = (function () {
	var baseA = require ('../js/main');

	baseA.bufferSettings (
		{
			initialSize: 64,
			incrementAmount: 64
		});

	var itemGroupBuilder = (function () {

		function ItemGroup (
			openDelimiter, closeDelimiter, items) {

			this.aTemp = function (factory) {
				factory.put (openDelimiter);
				var sep = '';
				var ia, na = items.length;
				for (ia = 0; ia < na; ia++) {
					factory.put (sep);
					factory.put (items [ia]);
					sep = ', ';
				}
				factory.put (closeDelimiter);
			};
		}

		return function (openDelimiter, closeDelimiter) {
			return function () {
				return new ItemGroup (
					openDelimiter, closeDelimiter, arguments);
			};
		};
	} ());

	baseA.block = itemGroupBuilder ('{', '}');

	baseA.array = itemGroupBuilder ('[', ']');

	return baseA;
} ());

exports.test_1 = function (test) {
	var tester = modTest.test ({ name: 'templates 1' });
	tester.logTest (
		function () {

			var expected = '{1, 2, 3}';
			tester.logExpected (expected);

			var template = A.template (
				A.block (
					'1',
					'2',
					'3'
				)
			);
			var got = A.string (template);

			tester.logGot (got);
			assert (expected === got, msgAssertExpectedGot);
		});
	test.done ();
};

exports.test_2 = function (test) {
	var tester = modTest.test ({ name: 'templates 2' });
	tester.logTest (
		function () {

			var expected = '{1, [10, 20], 3}';
			tester.logExpected (expected);

			var template = A.template (
				A.block (
					'1',
					A.array (
						'10',
						'20'
					),
					'3'
				)
			);
			var got = A.string (template);

			tester.logGot (got);
			assert (expected === got, msgAssertExpectedGot);
		});
	test.done ();
};

exports.test_3 = function (test) {
	var tester = modTest.test ({ name: 'templates 3' });
	tester.logTest (
		function () {

			var expected = '{a, b}';
			tester.logExpected (expected);

			var template = A.template (
				A.block (
					A.include (1),
					A.include ('2')
				)
			);
			var params = A.params ()
				.set (1, 'a')
				.set ('2', 'b');
			var got = A.string (params, template);

			tester.logGot (got);
			assert (expected === got, msgAssertExpectedGot);
		});
	test.done ();
};
