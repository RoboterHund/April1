// template start node
'use strict';

// constructor
function TemplateStart () {

	this.next = null;

	// generate string
	// nop
	this.generate = function () {
		return this.next;
	};

}

module.exports = TemplateStart;
