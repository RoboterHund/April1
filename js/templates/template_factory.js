// template factory
'use strict';

var stream_buffers = require ('stream-buffers');

var FixedString = require ('./fixed_string');

// template factory constructor
function TemplateFactory (buffer_params) {
	// factory
	var factory = this;
	var string_buffer = null;

	var parts = [];

	// parameterizer
	this.params = {
		get: function (ignore) {
			return undefined;
		}
	};

	// finish pending actions
	var finish = function () {

		// join accumulated fixed string parts
		var fixed_string;
		if (string_buffer) {
			fixed_string = string_buffer.getContentsAsString (
				buffer_params.encoding);
			string_buffer.destroy ();
			string_buffer = null;

			if (fixed_string.length > 0) {
				// add to template
				parts.push (
					new FixedString (fixed_string));
			}
		}
	};

	// consume input
	// one item
	var this__put_one = function (arg) {
		if (arg.to_template) {
			// generate template
			arg.to_template (factory);

		} else {
			// add string
			string_buffer = string_buffer
				|| new stream_buffers
					.WritableStreamBuffer (buffer_params);
			string_buffer.write (arg.toString ());
		}
	};
	this.put_one = this__put_one;

	// consume input
	// many items
	this.put = function () {
		var ia, na = arguments.length;
		for (ia = 0; ia < na; ia++) {
			this__put_one (arguments [ia]);
		}
	};

	// add segment of fixed string part
	this.append_string = function (string) {
		string_buffer = string_buffer
			|| new stream_buffers
				.WritableStreamBuffer (buffer_params);
		string_buffer.write (string);
	};

	// add part, not a fixed string
	// the part must implement to_string
	// or the template won't work
	this.append_part = function (part) {
		finish ();
		parts.push (part);
	};

	// get final result
	// must be the last method called
	this.get_result = function () {
		finish ();
		return parts;
	};
}

module.exports = TemplateFactory;
