// XML spec nodes
'use strict';

function XmlAttr (subnodes) {
	this.sub = subnodes;
}

function XmlTag (subnodes) {
	this.sub = subnodes;
}

module.exports = {
	XmlAttr: XmlAttr,
	XmlTag: XmlTag
};
