/* *
 *
 * April 1
 */

'use strict';

// import ./xml
var xmlTypes = require ('./xml/types');

// import ./templates
var ConstantString = require ('./templates/nodes/constant_string');
var Group = require ('./templates/group');
var Parameterizer = require ('./templates/parameters');
var SpecNode = require ('./templates/spec_node');
var StringGenerator = require ('./templates/string_generator');
var Template = require ('./templates/template');
var TemplateFactory = require ('./templates/types');

// April1 module stub
var A = {};

/* *
 *
 * configuration
 */

var bufferParams = {
	encoding: 'utf-8'
};

// configure buffer streams
A.bufferSettings = function (settings) {

	if (settings.encoding) {
		bufferParams.encoding = settings.encoding;
	}
	if (settings.initialSize) {
		bufferParams.initialSize = settings.initialSize;
	}
	if (settings.incrementAmount) {
		bufferParams.incrementAmount = settings.incrementAmount;
	}
};

/* *
 *
 * template fields
 */

// check whether is include
A.isInclude = function (arg) {
	return arg instanceof Include;
};

// new include
A.include = function (key) {
	return new Include (key);
};

/* *
 *
 * fixed strings
 */

// check whether is fixed string
A.isFixedString = function (arg) {
	return arg instanceof ConstantString;
};

// fixed string
A.fixedString = function (string) {
	return new ConstantString (string);
};

/* *
 *
 * templates
 */

// check whether is template
A.isTemplate = function (arg) {
	return arg instanceof Template;
};

// generate template from arguments
// all arguments must implement aTemp (TemplateBuilder)
A.template = function () {
	// create new factory
	var factory = new TemplateFactory (bufferParams, A.emitters);

	factory.put.apply (null, arguments);

	return new Template (factory.getTemplate ());
};

// group of reusable template items
A.group = function () {
	return new Group (arguments);
};

/* *
 *
 * parameterizers
 */

// check whether is parameterizer
A.isParams = function (arg) {
	return arg instanceof Parameterizer;
};

// new parameterizer
A.params = function (getDefaultValueSupplier) {
	return new Parameterizer (getDefaultValueSupplier ());
};

// default value suppliers
A.defaultValue =
	require ('./templates/defaults');

/* *
 *
 * string generators
 */

// check whether is string generator
A.isStringGenerator = function (arg) {
	return arg instanceof StringGenerator;
};

// new string generator
A.generator = function () {
	return new StringGenerator (bufferParams);
};

// generate string from arguments
// all arguments must implement generate (StringGenerator)
A.generate = function () {
	var generator = new StringGenerator (bufferParams);

	generator.put.apply (null, arguments);

	return generator.getTemplate ();
};

/* *
 *
 * XML
 */

// XML tag
A.tag = function (name) {
	return new SpecNode (
		xmlTypes.XML_TAG, arguments);
};

// XML attribute
A.attr = function (name, value) {
	return new SpecNode (
		xmlTypes.XML_ATTR, arguments);
};

/* *
 *
 * HTML
 */

// doctype html
A.doctype = function () {
	return A.fixedString ('<!DOCTYPE html>');
};

/* => HTML functions here */

/* *
 *
 * logic
 */

A.list = function () {
	return new ItemList (arguments, bufferParams);
};

module.exports = A;
