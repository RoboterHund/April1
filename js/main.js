/* *
 *
 * April 1
 */

'use strict';

// import ./markup
var XmlAttribute = require ('./markup/xml_attr');
var XmlTag = require ('./markup/xml_tag');

// import ./templates
var FixedString = require ('./templates/fixed_string');
var Include = require ('./templates/include');
var Parameterizer = require ('./templates/parameters');
var StringGenerator = require ('./templates/string_generator');
var Template = require ('./templates/template');
var TemplateFactory = require ('./templates/template_factory');

// April1 module stub
var A1 = {};

/* *
 *
 * configuration
 */

var buffer_params = {
	encoding: 'utf-8'
};

// configure buffer streams
A1.buffer_settings = function (settings) {
	if (settings.encoding) {
		buffer_params.encoding = settings.encoding;
	}
	if (settings.initialSize) {
		buffer_params.initialSize = settings.initialSize;
	}
	if (settings.incrementAmount) {
		buffer_params.incrementAmount = settings.incrementAmount;
	}
};

/* *
 *
 * template fields
 */

// check whether is include
A1.is_include = function (arg) {
	return arg instanceof Include;
};

// new include
A1.include = function (key) {
	return new Include (key);
};

/* *
 *
 * fixed strings
 */

// check whether is fixed string
A1.is_fixed_string = function (arg) {
	return arg instanceof FixedString;
};

// fixed string
A1.fixed_string = function (string) {
	return new FixedString (string);
};

/* *
 *
 * templates
 */

// check whether is template
A1.is_template = function (arg) {
	return arg instanceof Template;
};

// generate template from arguments
// all arguments must implement to_template (TemplateFactory)
A1.template = function () {
	// create new factory
	var factory = new TemplateFactory (buffer_params);

	factory.put.apply (null, arguments);

	return new Template (factory.get_result ());
};

/* *
 *
 * parameterizers
 */

// check whether is parameterizer
A1.is_params = function (arg) {
	return arg instanceof Parameterizer;
};

// new parameterizer
A1.params = function (placeholder) {
	return new Parameterizer (placeholder);
};

// placeholders
A1.placeholders = require ('./templates/placeholders');

/* *
 *
 * string generators
 */

// check whether is string generator
A1.is_string_generator = function (arg) {
	return arg instanceof StringGenerator;
};

// new string generator
A1.generator = function () {
	return new StringGenerator (buffer_params);
};

// generate string from arguments
// all arguments must implement to_string (StringGenerator)
A1.string = function () {
	var generator = new StringGenerator (buffer_params);

	generator.put.apply (null, arguments);

	return generator.get_result ();
};

/* *
 *
 * XML
 */

// check whether is XML tag
A1.is_tag = function (arg) {
	return arg instanceof XmlTag;
};

// XML tag
A1.tag = function (name) {
	return new XmlTag (arguments);
};

// check whether is XML attribute
A1.is_attr = function (arg) {
	return arg instanceof XmlAttribute;
};

// XML attribute
A1.attr = function (name, value) {
	return new XmlAttribute (name, value);
};

/* *
 *
 * HTML
 */

// doctype html
A1.doctype = function () {
	return A1.fixed_string ('<!DOCTYPE html>');
};

// from /js-meta/html_templates.meta.js
// (in repository)
/* tags */
A1.html = A1.tag.bind (undefined, 'html');
A1.head = A1.tag.bind (undefined, 'head');
A1.link = A1.tag.bind (undefined, 'link');
A1.meta = A1.tag.bind (undefined, 'meta');
A1.title = A1.tag.bind (undefined, 'title');
A1.body = A1.tag.bind (undefined, 'body');
A1.a = A1.tag.bind (undefined, 'a');
A1.abbr = A1.tag.bind (undefined, 'abbr');
A1.blockquote = A1.tag.bind (undefined, 'blockquote');
A1.br = A1.tag.bind (undefined, 'br');
A1.button = A1.tag.bind (undefined, 'button');
A1.code = A1.tag.bind (undefined, 'code');
A1.col = A1.tag.bind (undefined, 'col');
A1.colgroup = A1.tag.bind (undefined, 'colgroup');
A1.div = A1.tag.bind (undefined, 'div');
A1.em = A1.tag.bind (undefined, 'em');
A1.form = A1.tag.bind (undefined, 'form');
A1.h1 = A1.tag.bind (undefined, 'h1');
A1.h2 = A1.tag.bind (undefined, 'h2');
A1.h3 = A1.tag.bind (undefined, 'h3');
A1.h4 = A1.tag.bind (undefined, 'h4');
A1.h5 = A1.tag.bind (undefined, 'h5');
A1.h6 = A1.tag.bind (undefined, 'h6');
A1.img = A1.tag.bind (undefined, 'img');
A1.input = A1.tag.bind (undefined, 'input');
A1.label = A1.tag.bind (undefined, 'label');
A1.li = A1.tag.bind (undefined, 'li');
A1.object = A1.tag.bind (undefined, 'object');
A1.ol = A1.tag.bind (undefined, 'ol');
A1.option = A1.tag.bind (undefined, 'option');
A1.p = A1.tag.bind (undefined, 'p');
A1.span = A1.tag.bind (undefined, 'span');
A1.strong = A1.tag.bind (undefined, 'strong');
A1.table = A1.tag.bind (undefined, 'table');
A1.textarea = A1.tag.bind (undefined, 'textarea');
A1.tbody = A1.tag.bind (undefined, 'tbody');
A1.td = A1.tag.bind (undefined, 'td');
A1.tfoot = A1.tag.bind (undefined, 'tfoot');
A1.th = A1.tag.bind (undefined, 'th');
A1.thead = A1.tag.bind (undefined, 'thead');
A1.tr = A1.tag.bind (undefined, 'tr');
A1.ul = A1.tag.bind (undefined, 'ul');
A1.noscript = A1.tag.bind (undefined, 'noscript');
A1.script = A1.tag.bind (undefined, 'script');
A1.style = A1.tag.bind (undefined, 'style');
/* attributes */
A1.class_attr = A1.attr.bind (undefined, 'class');
A1.href = A1.attr.bind (undefined, 'href');
A1.id = A1.attr.bind (undefined, 'id');
A1.lang = A1.attr.bind (undefined, 'lang');
A1.name = A1.attr.bind (undefined, 'name');
A1.src = A1.attr.bind (undefined, 'src');
A1.style_attr = A1.attr.bind (undefined, 'style');
A1.type = A1.attr.bind (undefined, 'type');

module.exports = A1;

