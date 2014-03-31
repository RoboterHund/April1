"use strict";

var test = function (options) {

	return {
		log_line: function (msg) {
			console.log (msg);
		},

		log_start: function () {
			console.log ('start test \'' + options.name + '\'');
		},

		log_end: function () {
			console.log ('end test \'' + options.name + '\'');
			console.log ('-------------------------------\n');
		},

		log_expected: function (value) {
			this.log_line ('expected: ' + value);
		},

		log_got: function (value) {
			this.log_line ('     got: ' + value);
		},

		log_test: function (test) {
			this.log_start ();
			test ();
			this.log_end ();
		}
	};

};

module.exports = {

	test: test

};

