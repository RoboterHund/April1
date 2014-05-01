'use strict';

// linked list module
var get_linked_list_module = function (params) {

	// returned module
	var list_module =
		(params && params.extend) ? params.extend : {};

	// node constructor
	function ListNode (value) {
		this.value = value;
		this.next = null;
	}

	// linked list constructor
	function LinkedList () {

		// sentinel
		var head = new ListNode (null);

		// cursor
		var tail = head;

		// number of nodes
		var size = 0;

		// add node
		this.put = function (value) {
			tail.next = new ListNode (value);
			tail = tail.next;

			size++;

			return this;
		};

		// get first and last node
		// if empty, you get nothing
		this.get_list = function (to_function) {
			if (head.next) {
				to_function (head.next, tail);

			} else {
				to_function ();
			}
		};

		// join list
		this.join = function (list) {
			list.get_list (function (first, last) {
				if (first) {
					tail.next = first;
					tail = last;
				}
			});
		};

		// iterate
		this.each = function (visitor) {
			var cursor = head.next;
			while (cursor) {
				visitor (cursor.value);
				cursor = cursor.next;
			}
		};

		// pop first item
		//noinspection JSUnusedGlobalSymbols
		this.pop = function () {
			var popped = head.next;

			if (popped) {
				// it was something
				head.next = popped.next;

				if (popped === tail) {
					// and it was the last one
					tail = head;
				}

				size--;

				return popped.value;
			}
			return undefined;
		};

		// get size
		//noinspection JSUnusedGlobalSymbols
		this.size = function () {
			return size;
		};

		// is empty
		this.is_empty = function () {
			return size === 0;
		};
	}

	// check whether is list node
	list_module.is_list_node = function (arg) {
		return arg instanceof ListNode;
	};

	// check whether is linked list
	list_module.is_list = function (arg) {
		return arg instanceof LinkedList;
	};

	// new linked list
	list_module.list = function () {
		return new LinkedList ();
	};

	return list_module;
};

module.exports = get_linked_list_module;
