// templates module test
'use strict';

var assert = require ('assert');
var mod_test = require ('./test');

var msg_assert_expected_got = 'should be (expected === got)';

var A = (function () {
	var A1 = require ('../js/main');

	A1.buffer_settings (
		{
			initialSize    : 64,
			incrementAmount: 64
		});

	var item_group_builder = (function () {

		function ItemGroup (
			open_delimiter, close_delimiter, items) {

			this.to_template = function (factory) {
				factory.put (open_delimiter);
				var sep = '';
				var ia, na = items.length;
				for (ia = 0; ia < na; ia++) {
					factory.put (sep);
					factory.put (items [ia]);
					sep = ', ';
				}
				factory.put (close_delimiter);
			};
		}

		return function (open_delimiter, close_delimiter) {
			return function () {
				return new ItemGroup (
					open_delimiter, close_delimiter, arguments);
			};
		};
	} ());

	A1.block = item_group_builder ('{', '}');

	A1.array = item_group_builder ('[', ']');

	return A1;
} ());

exports.test_1 = function (test) {
	var tester = mod_test.test ({ name: 'templates 1' });
	tester.log_test (
		function () {

			var expected = '{1, 2, 3}';
			tester.log_expected (expected);

			var template = A.template (
				A.block (
					'1',
					'2',
					'3'
				)
			);
			var got = A.string (template);

			tester.log_got (got);
			assert (expected === got, msg_assert_expected_got);
		});
	test.done ();
};

exports.test_2 = function (test) {
	var tester = mod_test.test ({ name: 'templates 2' });
	tester.log_test (
		function () {

			var expected = '{1, [10, 20], 3}';
			tester.log_expected (expected);

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

			tester.log_got (got);
			assert (expected === got, msg_assert_expected_got);
		});
	test.done ();
};

exports.test_3 = function (test) {
	var tester = mod_test.test ({ name: 'templates 3' });
	tester.log_test (
		function () {

			var expected = '{a, b}';
			tester.log_expected (expected);

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

			tester.log_got (got);
			assert (expected === got, msg_assert_expected_got);
		});
	test.done ();
};
