"use strict";

var test = function (options) {

	return {
		logLine: function (msg) {
			console.log (msg);
		},

		logStart: function () {
			console.log ('start test \'' + options.name + '\'');
		},

		logEnd: function () {
			console.log ('end test \'' + options.name + '\'');
			console.log ('-------------------------------\n');
		},

		logExpected: function (value) {
			this.logLine ('expected: ' + value);
		},

		logGot: function (value) {
			this.logLine ('     got: ' + value);
		},

		logTest: function (test) {
			this.logStart ();
			test ();
			this.logEnd ();
		}
	};

};

module.exports = {

	test: test

};

