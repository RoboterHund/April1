//
'use strict';

var builder = require ('./modules/builder');
var common = require ('./modules/common');
var consumer = require ('./modules/consumer');
var defaults = require ('./modules/defaults');
var output = require ('./modules/output');
var params = require ('./modules/params');
var spec = require ('./modules/spec');
var templateNodes = require ('./modules/template_nodes');
var types = require ('./modules/types');

module.exports = {

	// modules
	builder: builder,
	common: common,
	consumer: consumer,
	defaults: defaults,
	output: output,
	parameterizer: params,
	spec: spec,
	templateNodes: templateNodes,
	types: types,

	// external interface

	// spec node builders
	insert: spec.createNodeBuilder (types.INSERT),
	list: spec.createNodeBuilder (types.LIST),
	macro: spec.createNodeBuilder (types.MACRO),

	// operation functions
	params: params.params,
	string: common.string,
	template: common.template

};
