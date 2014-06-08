// xml emitter
'use strict';

// xml emitter
function XmlEmitter () {

	this.start = function (factory, name) {
		factory.appendString ('<');
		factory.put (name);
	};

	this.attr = function (factory, attr) {
		factory.putOne (' ');
		factory.putOne (attr);
	};

	this.endAttrs = function (factory, isTagEmpty) {
		factory.putOne (
			isTagEmpty ? '/>' : '>');
	};

	this.content = function (factory, content_items) {
		factory.put.apply (null, content_items);
	};

	this.endContent = function (factory, name) {
		factory.put ('</', name, '>');
	};

}

module.exports = new XmlEmitter ();
