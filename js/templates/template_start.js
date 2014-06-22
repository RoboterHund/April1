// template start node
'use strict';

// constructor
// delete this, replace with Template
function TemplateStart () {

	this.next = null;

	// generate string
	// nop
	this.generate = function () {
		return this.next;
	};

}

module.exports = TemplateStart;
