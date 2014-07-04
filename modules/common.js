// common reusable functions, constants, etc.
//
// this module contains reusable code that is not considered
//  generic enough to include directly in any of the other modules

'use strict';

var builder = require ('./builder');
var consumer = require ('./consumer');
var defaults = require ('./defaults');
var output = require ('./output');
var parameterizer = require ('./params');
var spec = require ('./spec');
var types = require ('./types');

/**
 * common build state
 * @type {string}
 */
var BUILD = 'build';

/**
 * common dispatcher
 * @returns {{}} map of node types to builder functions
 */
function builderDispatcher () {
	var dispatch = {};

	dispatch [types.INSERT] = builder.insert;
	dispatch [types.LIST] = builder.list;
	dispatch [undefined] = builder.terminal;

	return dispatch;
}

var dispatch = builderDispatcher ();

/**
 * common template builder states
 * @returns {{}} map of state names to dispatchers
 */
function builderStates () {
	var states = {};

	states [BUILD] = dispatch;

	return states;
}

var states = builderStates ();

/**
 * common template builder params
 * @returns {{}} params for TemplateBuilder
 */
function builderParams () {
	return {
		buffer: {
			encoding: 'utf-8',
			initialSize: 0,
			incrementAmount: 0
		},
		initialState: BUILD,
		states: states
	};
}
var params = builderParams ();

/**
 * create template builder
 * wrap arguments in 'macro' spec node
 *  this is required for robustness,
 *  so that the spec node building logic is applied
 *  to the arguments
 * build template
 * @returns {TemplateHead} template head
 */
function buildTemplate () {
	var templateBuilder = builder.templateBuilder (this.params);
	var argsWrapper = spec.macro.apply (null, arguments);
	templateBuilder.build (argsWrapper);
	return templateBuilder.getTemplate ();
}

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
function outputString (template, paramsMap) {
	var writer = consumer.consumer (this.params.buffer);
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

	builderDispatcher: builderDispatcher,
	builderStates: builderStates,
	builderParams: builderParams,

	dispatch: dispatch,
	states: states,
	params: params,

	buildTemplate: buildTemplate,
	outputString: outputString,

	template: buildTemplate.bind ({params: params}),
	string: outputString.bind ({params: params})
};
