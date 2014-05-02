// templates module test
'use strict';

var assert = require ('assert');
var mod_test = require ('./test');

var msg_assert_expected_got = 'should be (expected === got)';

var T1 = (function () {
	var L = require ('../js/linked_list') ();
	var P = require ('../js/parameters') ();
	var T = require ('../js/templates') (
		{
			buffer_params: {
				encoding       : 'utf-8',
				initialSize    : 1024,
				incrementAmount: 512
			},
			list_module: L,
			extend     : P
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

	T.block = item_group_builder ('{', '}');

	T.array = item_group_builder ('[', ']');

	return T;
} ());

exports.test_1 = function (test) {
	var tester = mod_test.test ({ name: 'templates 1' });
	tester.log_test (function () {

		var expected = '{1, 2, 3}';
		tester.log_expected (expected);

		var template = T1.template (
			T1.block (
				'1',
				'2',
				'3'
			)
		);
		var got = T1.string (template);

		tester.log_got (got);
		assert (expected === got, msg_assert_expected_got);
	});
	test.done ();
};

exports.test_2 = function (test) {
	var tester = mod_test.test ({ name: 'templates 2' });
	tester.log_test (function () {

		var expected = '{1, {10, 20}, 3}';
		tester.log_expected (expected);

		var template = T1.template (
			T1.block (
				'1',
				T1.block (
					'10',
					'20'
				),
				'3'
			)
		);
		var got = T1.string (template);

		tester.log_got (got);
		assert (expected === got, msg_assert_expected_got);
	});
	test.done ();
};

exports.test_3 = function (test) {
	var tester = mod_test.test ({ name: 'templates 3' });
	tester.log_test (function () {

		var expected = '{a, b}';
		tester.log_expected (expected);

		var template = T1.template (
			T1.block (
				T1.include (1),
				T1.include ('2')
			)
		);
		var params = T1.params ()
			.set (1, 'a')
			.set ('2', 'b');
		var got = T1.string (params, template);

		tester.log_got (got);
		assert (expected === got, msg_assert_expected_got);
	});
	test.done ();
};
