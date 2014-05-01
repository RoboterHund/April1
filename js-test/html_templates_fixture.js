// HTML templates module test
'use strict';

var assert = require ('assert');
var mod_test = require ('./test');

var T = {};
var params = {
	extend          : T,
	list_module     : T,
	templates_module: T,
	xml_module      : T
};
require ('../js/linked_list') (params);
require ('../js/parameters') (params);
require ('../js/templates') (params);
require ('../js/xml_templates') (params);
require ('../js/html_templates') (params);

var placeholder = require ('../js/placeholders').forbidden_placeholder;

var msg_assert_expected_got = 'should be (expected === got)';

exports.test_1 = function (test) {
	var tester = mod_test.test ({ name: 'HTML templates 1' });
	tester.log_test (function () {

		var expected = '<!DOCTYPE html>'
			+ '<html>'
			+ '<head><title>HTML template test</title></head>'
			+ '<body lang="en">'
			+ '<p>Hello, Wörld!<br/>'
			+ '<span lang="ja">君はじつにばかだな！！！ :P</span></p>'
			+ '</body>'
			+ '</html>';
		tester.log_expected (expected);

		var keys = {
			title  : 'HTML template test',
			message: 'Hello, Wörld!'
		};

		var template = T.template (
			T.doctype (),
			T.html (
				T.head (
					T.title (T.include (keys.title))
				),
				T.body (
					T.lang ('en'),
					T.p (
						T.include (keys.message),
						T.br (),
						T.span (
							T.fixed_string ('君はじつにばかだな！！！ :P'),
							T.lang ('ja')
						)
					)
				)
			)
		);

		var got = T.string (
			T.params (placeholder)
				.set (keys.title, keys.title)
				.set (keys.message, keys.message),
			template
		);

		tester.log_got (got);
		assert (expected === got, msg_assert_expected_got);

	});
	test.done ();
};
