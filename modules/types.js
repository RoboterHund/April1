// spec node types
'use strict';

/**
 *
 * @param id
 * @constructor
 */
function Type (id) {
	this.id = id;
}



module.exports = {
	Type: Type,

	INSERT: new Type ('insert'),
	LIST: new Type ('list'),
	MACRO: new Type ('macro'),
	STRING: new Type ('string'),
	TEMPLATE: new Type ('template')
};
