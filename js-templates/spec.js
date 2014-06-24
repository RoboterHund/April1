//
'use strict';

var core = require ('../core.main');
var node = core.spec.node;
var types = core.types;

function group () {
	return node (types.GROUP, arguments);
}

function insert () {
	return node (types.INSERT, arguments);
}

function list () {
	return node (types.LIST, arguments);
}

module.exports = {
	group: group,
	insert: insert,
	list: list
};
