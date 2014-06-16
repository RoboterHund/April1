'use strict';

// constructor
function Template (startNode) {

	this.next = null;

	// generate
	this.generate = function (generator) {
		var node = startNode;

		while (node) {
			node = node.generate (generator);
		}

		return this.next;
	};

}

module.exports = Template;
