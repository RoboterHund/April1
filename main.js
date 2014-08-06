// April 1
// main module
'use strict';

var tempBuild = require ('./modules/templates/build');
var tempOutput = require ('./modules/templates/output');
var tempSpec = require ('./modules/templates/spec');

var consumer = require ('./modules/consumer');
var defaults = require ('./modules/defaults');
var dispatch = require ('./modules/dispatch');
var output = require ('./modules/output');
var params = require ('./modules/params');
var spec = require ('./modules/spec');
var template = require ('./modules/template');
var types = require ('./modules/types');

module.exports = {

	// modules
	modules: {
		templates: {
			build: tempBuild,
			output: tempOutput,
			spec: tempSpec
		},
		consumer: consumer,
		defaults: defaults,
		dispatch: dispatch,
		output: output,
		parameterizer: params,
		spec: spec,
		template: template,
		types: types
	},

	// external interface

	// spec node builders
	insert: tempSpec.insertNode,
	list: tempSpec.listNode,
	macro: spec.macro,

	// operation functions
	params: params.params,
	string: template.doBuildString,
	template: template.doBuildTemplate

};
