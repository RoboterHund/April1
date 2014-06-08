// HTML templates module test
'use strict';

var assert = require ('assert');
var modTest = require ('./test');

var A = require ('../js/main');

var placeholder = require ('../js/templates/placeholders').error;

var msgAssertExpectedGot = 'should be (expected === got)';

exports.test_1 = function (test) {
	var tester = modTest.test ({ name: 'HTML templates 1' });
	tester.logTest (
		function () {

			var expected = '<!DOCTYPE html>'
				+ '<html>'
				+ '<head><title>HTML template test</title></head>'
				+ '<body lang="en">'
				+ '<p>Hello, Wörld!<br/>'
				+ '<span lang="ja">君はじつにばかだな！！！ :P</span></p>'
				+ '</body>'
				+ '</html>';
			tester.logExpected (expected);

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
								A.fixedString ('君はじつにばかだな！！！ :P'),
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

			tester.logGot (got);
			assert (expected === got, msgAssertExpectedGot);

		});
	test.done ();
};

exports.test_2 = function (test) {
	var tester = modTest.test ({ name: 'HTML templates 2' });
	tester.logTest (
		function () {

			var expected = '<!DOCTYPE html>'
				+ '<html>'
				+ '<head><title>HTML list template test</title></head>'
				+ '<body>'
				+ '<ul>'
				+ ' <li>a: 1</li>'
				+ ' <li>b: 2</li>'
				+ ' <li>c: 3</li>'
				+ ' <li>z: -undefined-</li>'
				+ '</ul>'
				+ '</body>'
				+ '</html>';
			tester.logExpected (expected);

			var values = {
				title: 'HTML list template test',
				items: [
					{
						k: 'a',
						v: 1
					},
					{
						k: 'b',
						v: 2
					},
					{
						k: 'c',
						v: 3
					},
					{
						k: 'z'
					}
				],
				v    : '-undefined-'
			};

			var template = A.template (
				A.doctype (),
				A.html (
					A.head (
						A.title (A.include ('title'))
					),
					A.body (
						A.ul (
							A.list (
								'items',
								' ',
								A.li (
									A.include ('k'),
									A.include ('undefined value :P'),
									' ',
									A.include ('v')
								)
							)
						)
					)
				)
			);

			var placeholder = function (ignore) {
				return ':';
			};

			var params = A.params (placeholder);
			params.map = values;

			var got = A.string (params, template);

			tester.logGot (got);
			assert (expected === got, msgAssertExpectedGot);

		});
	test.done ();
};
