//
'use strict';

var builder = require ('./builder');
var consumer = require ('./consumer');
var defaults = require ('./defaults');
var output = require ('./output');
var parameterizer = require ('./params');
var spec = require ('./spec');
var types = require ('./types');

// common build state

var BUILD = 'build';

// common dispatcher

var dispatch = {};

dispatch [types.INSERT] = builder.insert;
dispatch [types.LIST] = builder.list;
dispatch [types.MACRO] = builder.macro;
dispatch [types.TERM] = builder.term;

// common template builder states

var states = {};

states [BUILD] = dispatch;

// common template builder params

var params = {
	buffer: {
		encoding: 'utf-8',
		initialSize: 0,
		incrementAmount: 0
	},
	initialState: BUILD,
	states: states
};

// common template builder

/**
 * create template builder
 * wrap arguments in 'macro' spec node
 *  this is required for robustness,
 *  so that the spec node building logic is applied
 *  to the arguments
 * build template
 * @returns {TemplateHead} template head
 */
function template () {
	var templateBuilder = builder.templateBuilder (params);
	var argsWrapper = spec.specNode (types.MACRO, arguments);
	templateBuilder.build (argsWrapper.sub);
	return templateBuilder.getTemplate ();
}

// common output generator

/**
 * create consumer
 * @param template
 * @param paramsMap
 * @returns {*}
 */
function string (template, paramsMap) {
	var writer = consumer.consumer (params.buffer);
	var templateParams =
		parameterizer.params (
			paramsMap, defaults.missingParamError ());
	var generator =
		new output.Output (
			writer, template, templateParams);
	return generator.string ();
}

module.exports = {
	BUILD: BUILD,
	dispatch: dispatch,
	params: params,
	states: states,
	string: string,
	template: template
};
