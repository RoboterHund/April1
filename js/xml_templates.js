// XML templates
'use strict';

// requires
// linked list
// templates

// XML templates module
var get_xml_module = function (params) {

	// returned module
	var xml_module;
	if (params.extend) {
		// extend module
		xml_module = params.extend;

	} else {
		// new module
		xml_module = {};
	}

	// templates module
	var T = params.templates_module;

	// list module
	var L = params.list_module;

	// XML attribute builder constructor
	function XmlAttribute (name, value) {

		// generate template
		this.to_template = function (factory) {
			factory.put (
				' ', name, '="', value, '"');
		};

	}

	// XML tag builder constructor
	function XmlTag (args) {

		var name = args [0];

		// generate template
		this.to_template = function (factory) {
			factory.append_string ('<');
			factory.put (name);

			var cont_items = L.list ();

			// add attributes
			var ia, na = args.length;
			for (ia = 1; ia < na; ia++) {
				var arg = args [ia];

				if (arg instanceof XmlAttribute) {
					// attribute
					factory.put (arg);

				} else {
					// content
					cont_items.put (arg);
				}
			}

			if (!cont_items.is_empty ()) {
				// add content
				factory.append_string ('>');
				factory.concatenate (cont_items);

				factory.put ('</', name, '>');

			} else {
				factory.append_string ('/>');
			}
		};

	}

	// check whether is XML tag
	xml_module.is_tag = function (arg) {
		return arg instanceof XmlTag;
	};

	// XML tag
	xml_module.tag = function (name) {
		return new XmlTag (arguments);
	};

	// check whether is XML attribute
	xml_module.is_attr = function (arg) {
		return arg instanceof XmlAttribute;
	};

	// XML attribute
	xml_module.attr = function (name, value) {
		return new XmlAttribute (name, value);
	};

	return xml_module;
};

module.exports = {
	get_xml_module: get_xml_module
};
