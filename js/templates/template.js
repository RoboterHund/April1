'use strict';

// template constructor
function Template (parts) {

	// generate template
	this.to_template = function (factory) {
		var i, num_parts = parts.length;
		for (i = 0; i < num_parts; i++) {
			parts [i].to_template (factory);
		}
	};

	// generate string
	// feed each part to generator
	this.to_string = function (generator) {
		var i, num_parts = parts.length;
		for (i = 0; i < num_parts; i++) {
			parts [i].to_string (generator);
		}
	};

}

module.exports = Template;
