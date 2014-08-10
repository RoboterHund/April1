// templates
// building
'use strict';

var dispatch = require ('../dispatch');
var types = require ('../types');

var spec = require ('./spec');

var WritableStreamBuffer =
	require ('stream-buffers').WritableStreamBuffer;

/**
 *
 * @param params
 * @returns {{}}
 */
function templateBuilder (params) {
	return {
		params: params,
		template: spec.templateNode (),
		dispatch: params.dispatch,
		buffer: null
	};
}

/**
 *
 * @param builder
 * @param node
 */
function appendNode (builder, node) {
	builder.template.push (node);
}

/**
 *
 * @param builder
 * @param constant
 */
function appendConstant (builder, constant) {
	if (!builder.buffer) {
		builder.buffer =
			new WritableStreamBuffer (builder.params.buffer);
	}
	builder.buffer.write (constant.toString ());
}

/**
 *
 * @param builder
 */
function finishPending (builder) {
	if (builder.buffer) {
		var string = builder.buffer.getContentsAsString (
			builder.params.buffer.encoding);
		builder.buffer.destroy ();
		builder.buffer = null;
		if (string.length > 0) {
			appendNode (builder, spec.stringNode (string));
		}
	}
}

/**
 *
 * @param builder
 * @returns {Array}
 */
function getTemplate (builder) {
	finishPending (builder);
	return builder.template;
}

/**
 *
 * @param builder
 * @returns {{}}
 */
function subBuilder (builder) {
	return builder.params.subBuilder (builder.params);
}

/**
 * process 'insert' spec node
 * append 'insert' template node
 * @param builder template builder
 * @param node the spec node
 *  should contain 1 item:
 *   the key of the 'insert' template node
 */
function insert (builder, node) {
	finishPending (builder);

	appendNode (builder, spec.insertNode (node [1]));
}

/**
 * process 'list' spec node
 * append 'list' template node
 * @param builder template builder
 * @param node the spec node
 *  should contain at least 2 items:
 *   key of the list items
 *   the spec nodes of the template used to render the list items
 */
function list (builder, node) {
	finishPending (builder);

	var key = node [1];
	var sub = subBuilder (builder);

	dispatch.nodes (sub, builder.dispatch, node, 2, node.length);

	var template = getTemplate (sub);
	appendNode (builder, spec.listNode (key, template));
}

/**
 *
 * @returns {{}}
 */
function dispatcher () {
	var disp = dispatch.dispatcher (appendConstant);

	dispatch.setup (disp, types.INSERT, insert);
	dispatch.setup (disp, types.LIST, list);

	return disp;
}

module.exports = {
	templateBuilder: templateBuilder,
	appendNode: appendNode,
	appendConstant: appendConstant,
	finishPending: finishPending,
	getTemplate: getTemplate,
	subBuilder: subBuilder,
	insert: insert,
	list: list,
	dispatcher: dispatcher,
	dispatch: dispatcher ()
};
