// templates
// spec nodes
'use strict';

var spec = require ('../spec');
var types = require ('../types');

module.exports = {
	templateNode: spec.nodeBuilder(types.TEMPLATE),
	stringNode: spec.nodeBuilder(types.STRING),
	insertNode: spec.nodeBuilder(types.INSERT),
	listNode: spec.nodeBuilder(types.LIST)
};
