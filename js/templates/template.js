'use strict';

// template constructor
function Template (parts) {

	// generate template
	this.aTemp = function (factory) {
		var i, num_parts = parts.length;
		for (i = 0; i < num_parts; i++) {
			parts [i].aTemp (factory);
		}
	};

	// generate string
	// feed each part to generator
	this.aStr = function (generator) {
		var i, num_parts = parts.length;
		for (i = 0; i < num_parts; i++) {
			parts [i].aStr (generator);
		}
	};

}

module.exports = Template;
