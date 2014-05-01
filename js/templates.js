// templates module
'use strict';

// requires:
// linked list

// templates module
var get_templates_module = function (params) {

	// returned module
	var templates_module =
		(params && params.extend) ? params.extend : {};

	// list module
	var list_module = params.list_module;

	// empty parameterizer
	var empty_params = {
		get: function (ignore) {
			return undefined;
		}
	};

	// include constructor
	function Include (key) {

		// include
		var include = this;

		// generate template
		this.to_template = function (factory) {
			var value = factory.params.get (key);

			if (value !== undefined) {
				// output value given by parameterizer
				factory.put (value);

			} else {
				// output self
				factory.append_part (include);
			}
		};

		// generate string
		this.to_string = function (generator) {
			var value = generator.params.get (key);
			if (value.to_string) {
				// feed value to generator
				value.to_string (generator);

			} else {
				// assume value is a string
				generator.append (value);
			}
		};
	}

	// check whether is include
	templates_module.is_include = function (arg) {
		return arg instanceof Include;
	};

	// new include
	templates_module.include = function (key) {
		return new Include (key);
	};

	// fixed string part constructor
	function FixedString (string) {

		// generate template
		// add string
		// this function exists merely for consistency,
		// the real purpose of this class is to store
		// a string to feed string generators
		this.to_template = function (factory) {
			factory.append_string (string);
		};

		// generate string
		// add string
		this.to_string = function (generator) {
			generator.append (string);
		};

	}

	// check whether is fixed string
	templates_module.is_fixed_string = function (arg) {
		return arg instanceof FixedString;
	};

	// fixed string
	templates_module.fixed_string = function (string) {
		return new FixedString (string);
	};

	// template factory constructor
	function TemplateFactory () {

		// factory
		var factory = this;
		var string_parts = [];
		var parts = list_module.list ();

		// parameterizer
		this.params = empty_params;

		// finish pending actions
		var finish = function () {

			// join accumulated fixed string parts
			var fixed_string = string_parts.join ('');

			if (fixed_string.length > 0) {
				// add to template
				parts.put (
					new FixedString (fixed_string));
			}

			string_parts = [];
		};

		// consume input
		this.put = function () {
			var ia, na = arguments.length;
			for (ia = 0; ia < na; ia++) {
				var arg = arguments [ia];

				if (arg.to_template) {
					// generate template
					arg.to_template (factory);

				} else {
					// add string
					var string = arg.toString ();
					string_parts.push (string);
				}
			}
		};

		// add segment of fixed string part
		this.append_string = function (string) {
			string_parts.push (string);
		};

		// add part, not a fixed string
		// the part must implement to_string
		// or the template won't work
		this.append_part = function (part) {
			finish ();
			parts.put (part);
		};

		// append items from list
		this.concatenate = function (list) {
			list.each (function (item) {
				factory.put (item);
			});
		};

		// get final result
		this.get_result = function () {
			finish ();
			return parts;
		};
	}

	// template constructor
	function Template (parts) {

		// template
		var template = this;

		// generate template
		this.to_template = function (factory) {
			if (factory.params === undefined) {
				// add as nested template
				factory.append_part (template);

			} else {
				// regenerate template
				factory.concatenate (parts);
			}
		};

		// generate string
		// feed each part to generator
		this.to_string = function (generator) {
			parts.each (function (item) {
				item.to_string (generator);
			});
		};

	}

	// check whether is template
	templates_module.is_template = function (arg) {
		return arg instanceof Template;
	};

	// generate template automatically
	templates_module.template = function () {
		// create new factory
		var factory = new TemplateFactory ();

		factory.put.apply (null, arguments);

		return new Template (factory.get_result ());
	};

	// string generator constructor
	function StringGenerator () {

		// generator
		var generator = this;

		// string parts
		var parts = [];

		// parameters
		this.params = null;

		// consume input
		// all arguments must implement to_string
		this.put = function (arg) {
			var ia, na = arguments.length;
			for (ia = 0; ia < na; ia++) {
				arguments [ia].to_string (generator);
			}
		};

		// add string
		this.append = function (string) {
			parts.push (string);
		};

		// get final string
		this.get_result = function () {
			// join string parts
			return parts.join ('');
		};
	}

	// check whether is string generator
	templates_module.is_string_generator = function (arg) {
		return arg instanceof StringGenerator;
	};

	// new string generator
	templates_module.generator = function () {
		return new StringGenerator ();
	};

	// generate string automatically
	// note that this will not admit strings as arguments
	// (fixed strings should be used instead)
	templates_module.string = function () {
		var generator = new StringGenerator ();

		generator.put.apply (null, arguments);

		return generator.get_result ();
	};

	return templates_module;
};

module.exports = get_templates_module;
