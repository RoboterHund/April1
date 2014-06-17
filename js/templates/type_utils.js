// helper functions
'use strict';

// get node type
function nodeType (node) {
	return node.constructor.name;
}

// get type from constructor function
function type (constructor) {
	return constructor.name;
}

// true if node is of specified type
function isType (node, constructor) {
	return nodeType (node) === type (constructor);
}

// type set
function TypeSet () {
	this.types = {};
	this.add = function (constructor) {
		var type = type (constructor);
		this.types [type] = type;
		return this;
	};
	this.includes = function (node) {
		return this.types [nodeType (node)] !== undefined;
	};
}
function newTypeSet () {
	return new TypeSet ();
}

module.exports = {
	nodeType: nodeType,
	type: type,
	isType: isType,
	typeSet: newTypeSet
};
