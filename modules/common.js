//
'use strict';

var builder = require ('./builder');
var consumer = require ('./consumer');
var output = require ('./output');
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

function template () {
	var templateBuilder = builder.templateBuilder (params);
	var nodes = spec.specNode (types.MACRO, arguments);
	return templateBuilder.build (nodes.sub);
}

// common output generator

function string (template, params) {
	var writer = consumer.consumer (params.buffer);
	var generator =
		new output.Output (writer, template, params);
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
