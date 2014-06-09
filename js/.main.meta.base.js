/* *
 *
 * April 1
 */

'use strict';

// import ./logic
var ItemList = require ('./logic/item_list');

// import ./markup
var XmlAttribute = require ('./markup/xml_attr');
var XmlTag = require ('./markup/xml_tag');

// import ./templates
var FixedString = require ('./templates/fixed_string');
var TemplateItemGroup = require ('./templates/group');
var Include = require ('./templates/include');
var Parameterizer = require ('./templates/parameters');
var StringGenerator = require ('./templates/string_generator');
var Template = require ('./templates/template');
var TemplateFactory = require ('./templates/template_factory');

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
 * emitters
 */

A.emitters = {
	xml: require ('./markup/xml_tag_emitter')
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
	return arg instanceof FixedString;
};

// fixed string
A.fixedString = function (string) {
	return new FixedString (string);
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
// all arguments must implement aTemp (TemplateFactory)
A.template = function () {
	// create new factory
	var factory = new TemplateFactory (bufferParams, A.emitters);

	factory.put.apply (null, arguments);

	return new Template (factory.getResult ());
};

// group of reusable template items
A.group = function () {
	return new TemplateItemGroup (arguments);
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
A.params = function (placeholder) {
	return new Parameterizer (placeholder);
};

// placeholders
A.placeholders = require ('./templates/placeholders');

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
// all arguments must implement aStr (StringGenerator)
A.string = function () {
	var generator = new StringGenerator (bufferParams);

	generator.put.apply (null, arguments);

	return generator.getResult ();
};

/* *
 *
 * XML
 */

// check whether is XML tag
A.isTag = function (arg) {
	return arg instanceof XmlTag;
};

// XML tag
A.tag = function (name) {
	return new XmlTag (arguments);
};

// check whether is XML attribute
A.isAttr = function (arg) {
	return arg instanceof XmlAttribute;
};

// XML attribute
A.attr = function (name, value) {
	return new XmlAttribute (name, value);
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
