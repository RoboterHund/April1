// node factory context
'use strict';

/**
 *
 * @constructor
 */
function Context (parentContext, factory) {

	this.parent = parentContext;

	this.factory = factory;

}

module.exports = Context;
