//
'use strict';

var core = require ('../core.main');
var BaseNode = core.spec.BaseNode;
var types = core.types;

function macro () {
	return new BaseNode (types.MACRO, arguments);
}

function insert () {
	return new BaseNode (types.INSERT, arguments);
}

function list () {
	return new BaseNode (types.LIST, arguments);
}

module.exports = {
	insert: insert,
	list: list,
	macro: macro
};
