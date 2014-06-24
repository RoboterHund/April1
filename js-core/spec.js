//
'use strict';

var GROUP = require ('./types').GROUP;

function node (type, sub) {
	return {
		type: type,
		sub: sub
	};
}

function flatten (array, nodes) {
	var i;
	var n = nodes.length;
	var sub;
	for (i = 0; i < n; i++) {
		sub = nodes [i];
		if (sub.type === GROUP) {
			flatten (array, sub.sub);
		} else {
			array.push (sub);
		}
	}
}

function normalize (node) {
	var norm = [];
	flatten (norm, node.sub);
	node.sub = norm;
}

module.exports = {
	node: node,
	normalize: normalize
};
