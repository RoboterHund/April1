// output consumer
'use strict';

var Parameterizer = require ('./parameters');

/**
 *
 * @constructor
 */
function Consumer (write, params) {

	this.write = write;

	this.pushParams = function (map) {
		params = new Parameterizer (params, map);
	};

	this.replaceParamsValues = function (map) {
		params.map = map;
	};

	this.popParams = function () {
		params = params.getSuperior ();
	};

}

module.exports = Consumer;
