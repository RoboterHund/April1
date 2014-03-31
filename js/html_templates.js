// HTML templates
'use strict';

// requires
// templates
// XML templates

// HTML templates module
var get_html_module = function (params) {

	// returned module
	var html_module;
	if (params && params.extend) {
		// extend module
		html_module = params.extend;

	} else {
		// new module
		html_module = {};
	}

	// templates module
	var T = params.templates_module;

	// XML templates module
	var X = params.xml_module;

	// doctype html
	html_module.doctype = function () {
		return T.fixed_string ('<!DOCTYPE html>');
	};

	html_module.doctype = function () {
		return T.fixed_string ('<!DOCTYPE html>');
	};

	// html_templates.meta.js
	// {
	/* tags */
	html_module.html = X.tag.bind (undefined, 'html');
	html_module.head = X.tag.bind (undefined, 'head');
	html_module.meta = X.tag.bind (undefined, 'meta');
	html_module.title = X.tag.bind (undefined, 'title');
	html_module.body = X.tag.bind (undefined, 'body');
	html_module.a = X.tag.bind (undefined, 'a');
	html_module.br = X.tag.bind (undefined, 'br');
	html_module.div = X.tag.bind (undefined, 'div');
	html_module.h1 = X.tag.bind (undefined, 'h1');
	html_module.h2 = X.tag.bind (undefined, 'h2');
	html_module.h3 = X.tag.bind (undefined, 'h3');
	html_module.h4 = X.tag.bind (undefined, 'h4');
	html_module.h5 = X.tag.bind (undefined, 'h5');
	html_module.h6 = X.tag.bind (undefined, 'h6');
	html_module.img = X.tag.bind (undefined, 'img');
	html_module.p = X.tag.bind (undefined, 'p');
	html_module.span = X.tag.bind (undefined, 'span');
	html_module.table = X.tag.bind (undefined, 'table');
	html_module.td = X.tag.bind (undefined, 'td');
	html_module.th = X.tag.bind (undefined, 'th');
	html_module.tr = X.tag.bind (undefined, 'tr');
	html_module.script = X.tag.bind (undefined, 'script');
	html_module.style = X.tag.bind (undefined, 'style');
	/* attributes */
	html_module.class_attr = X.attr.bind (undefined, 'class');
	html_module.href = X.attr.bind (undefined, 'href');
	html_module.id = X.attr.bind (undefined, 'id');
	html_module.lang = X.attr.bind (undefined, 'lang');
	html_module.src = X.attr.bind (undefined, 'src');
	html_module.inline_style = X.attr.bind (undefined, 'style');
	// }

	return html_module;
};

module.exports = {
	get_html_module: get_html_module
};
