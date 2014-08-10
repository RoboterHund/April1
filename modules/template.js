//
'use strict';

var tempBuild = require ('./templates/build');
var tempOutput = require ('./templates/output');

var consumer = require ('./consumer');
var defaults = require ('./defaults');
var dispatch = require ('./dispatch');
var output = require ('./output');
var spec = require ('./spec');
var types = require ('./types');

function buildTemplate (params, templateBuilder) {
	templateBuilder = templateBuilder || tempBuild.templateBuilder;
	if (!params.subBuilder) {
		params.subBuilder = templateBuilder;
	}
	return function doBuildTemplate () {
		var specRoot = spec.specNode (types.MACRO, arguments);
		var builder = templateBuilder (params);
		dispatch.process (builder, specRoot, 1, specRoot.length);
		return tempBuild.getTemplate (builder);
	}
}

function defaultTemplateParams () {
	return {
		dispatch: tempBuild.dispatch,
		buffer: {
			encoding: 'utf-8',
			initialSize: 0,
			incrementAmount: 0
		}
	};
}

var doBuildTemplate = buildTemplate (defaultTemplateParams ());

function buildString (buildParams) {
	return function doBuildString (template, params) {
		var cons = consumer.consumer (buildParams.buffer);
		var out = output.output (
			cons, template, params, buildParams.getDefault);
		return out.string ();
	};
}

function defaultStringParams () {
	return {
		dispatch: tempOutput.dispatch,
		getDefault: defaults.missingParamError (),
		buffer: {
			encoding: 'utf-8',
			initialSize: 0,
			incrementAmount: 0
		}
	};
}

var doBuildString = buildString (defaultStringParams ());

module.exports = {
	buildTemplate: buildTemplate,
	defaultTemplateParams: defaultTemplateParams,
	doBuildTemplate: doBuildTemplate,
	buildString: buildString,
	defaultStringParams: defaultStringParams,
	doBuildString: doBuildString
};
