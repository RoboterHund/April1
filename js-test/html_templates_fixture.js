// HTML templates module test
'use strict';

var assert = require ('assert');
var mod_test = require ('./test');

var A = require ('../js/main');

var placeholder = require ('../js/templates/placeholders').error;

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

		var template = A.template (
			A.doctype (),
			A.html (
				A.head (
					A.title (A.include (keys.title))
				),
				A.body (
					A.lang ('en'),
					A.p (
						A.include (keys.message),
						A.br (),
						A.span (
							A.fixed_string ('君はじつにばかだな！！！ :P'),
							A.lang ('ja')
						)
					)
				)
			)
		);

		var got = A.string (
			A.params (placeholder)
				.set (keys.title, keys.title)
				.set (keys.message, keys.message),
			template
		);

		tester.log_got (got);
		assert (expected === got, msg_assert_expected_got);

	});
	test.done ();
};
