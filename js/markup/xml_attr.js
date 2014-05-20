// xml attribute
'use strict';

// XML attribute builder constructor
function XmlAttribute (name, value) {

	// generate template
	this.to_template = function (factory) {
		factory.put (
			' ', name, '="', value, '"');
	};

}

module.exports = XmlAttribute;
