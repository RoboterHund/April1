// common reusable functions, constants, etc.
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
dispatch [undefined] = builder.terminal;

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
	var argsWrapper = spec.macro.apply (null, arguments);
	templateBuilder.build (argsWrapper);
	return templateBuilder.getTemplate ();
}

// common output generator

/**
 * create consumer
 * create parameterizer
 *  it will throw error if a key is not found
 * create output generator
 * generate string with given template and parameters
 * @param template template nodes list
 * @param paramsMap object mapping keys to values
 * @returns {string} the result of combining the template
 *  with the given parameters
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
	states: states,
	params: params,
	template: template,
	string: string
};
