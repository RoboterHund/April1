// parameterizer
'use strict';

/**
 * parameterizer constructor
 * this contains the values to fill the template
 *  and a reference to another parameterizer,
 *  which is used to form the params stack
 * @param {Object} map map of keys to values
 *  the type of each value must be the type
 *  expected by the template node that uses the value
 * @param {Parameterizer} outside the parent of this parameterizer
 *  in the params stack
 * @constructor
 */
function Parameterizer (map, outside) {
	this.map = map;
	this.outside = outside;
}

/**
 * parameterizer constructor wrapper
 * @param {Object} map passed to constructor
 * @param {Parameterizer} outside passed to constructor
 * @returns {Parameterizer} initialized parameterizer
 */
function params (map, outside) {
	return new Parameterizer (map, outside);
}

/**
 * get value
 * @param key key of the value in the map
 * @returns {*} the value, or,
 *   if not found, the value found by recursively
 *   searching for te same key in the parent
 *  note:
 *   the root parameterizer must override get,
 *    to stop the recursion
 */
Parameterizer.prototype.get = function (key) {
	var value = this.map [key];
	if (value !== undefined) {
		return value;
	} else {
		return this.outside.get (key);
	}
};

module.exports = {
	Parameterizer: Parameterizer,
	params: params
};
