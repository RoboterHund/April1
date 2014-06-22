// list of items
// template node
'use strict';

// item list constructor
function List (paramKey, template) {

	// next template node
	this.next = null;

	// generate items
	this.generate = function (consumer) {
		var items = consumer.params.get (paramKey);
		var ii, ni = items.length;

		consumer.pushParams (null);
		for (ii = 0; ii < ni; ii++) {
			consumer.replaceParamsValues (items[ii]);
			template.generate (consumer);
		}
		consumer.popParams ();

		return this.next;
	};

}

module.exports = List;
