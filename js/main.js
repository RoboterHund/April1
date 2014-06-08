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
	var factory = new TemplateFactory (bufferParams);

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

// from /js-meta/html_templates.meta.js
// (in repository)
/* tags */
A.html = A.tag.bind (undefined, 'html');
A.head = A.tag.bind (undefined, 'head');
A.link = A.tag.bind (undefined, 'link');
A.meta = A.tag.bind (undefined, 'meta');
A.title = A.tag.bind (undefined, 'title');
A.body = A.tag.bind (undefined, 'body');
A.a = A.tag.bind (undefined, 'a');
A.abbr = A.tag.bind (undefined, 'abbr');
A.blockquote = A.tag.bind (undefined, 'blockquote');
A.br = A.tag.bind (undefined, 'br');
A.button = A.tag.bind (undefined, 'button');
A.code = A.tag.bind (undefined, 'code');
A.col = A.tag.bind (undefined, 'col');
A.colgroup = A.tag.bind (undefined, 'colgroup');
A.div = A.tag.bind (undefined, 'div');
A.em = A.tag.bind (undefined, 'em');
A.form = A.tag.bind (undefined, 'form');
A.h1 = A.tag.bind (undefined, 'h1');
A.h2 = A.tag.bind (undefined, 'h2');
A.h3 = A.tag.bind (undefined, 'h3');
A.h4 = A.tag.bind (undefined, 'h4');
A.h5 = A.tag.bind (undefined, 'h5');
A.h6 = A.tag.bind (undefined, 'h6');
A.img = A.tag.bind (undefined, 'img');
A.input = A.tag.bind (undefined, 'input');
A.label = A.tag.bind (undefined, 'label');
A.li = A.tag.bind (undefined, 'li');
A.object = A.tag.bind (undefined, 'object');
A.ol = A.tag.bind (undefined, 'ol');
A.option = A.tag.bind (undefined, 'option');
A.p = A.tag.bind (undefined, 'p');
A.span = A.tag.bind (undefined, 'span');
A.strong = A.tag.bind (undefined, 'strong');
A.table = A.tag.bind (undefined, 'table');
A.textarea = A.tag.bind (undefined, 'textarea');
A.tbody = A.tag.bind (undefined, 'tbody');
A.td = A.tag.bind (undefined, 'td');
A.tfoot = A.tag.bind (undefined, 'tfoot');
A.th = A.tag.bind (undefined, 'th');
A.thead = A.tag.bind (undefined, 'thead');
A.tr = A.tag.bind (undefined, 'tr');
A.ul = A.tag.bind (undefined, 'ul');
A.noscript = A.tag.bind (undefined, 'noscript');
A.script = A.tag.bind (undefined, 'script');
A.style = A.tag.bind (undefined, 'style');
/* attributes */
A.class_attr = A.attr.bind (undefined, 'class');
A.href = A.attr.bind (undefined, 'href');
A.id = A.attr.bind (undefined, 'id');
A.lang = A.attr.bind (undefined, 'lang');
A.name = A.attr.bind (undefined, 'name');
A.src = A.attr.bind (undefined, 'src');
A.style_attr = A.attr.bind (undefined, 'style');
A.type = A.attr.bind (undefined, 'type');

/* *
 *
 * logic
 */

A.list = function () {
	return new ItemList (arguments, bufferParams);
};

module.exports = A;

