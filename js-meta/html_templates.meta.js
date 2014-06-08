// metaprogram script
// HTML templates
'use strict';

function generateHtmlModuleCode () {
	var out = function (arg) {
		console.log (arg);
	};

	var A = require ('../js/main');

	function RenamedItem (original, renamed) {
		this.original = original;
		this.renamed = renamed;
	}

	var renamed = function (o, r) {
		return new RenamedItem (o, r);
	};

	var tags = [
		'html',

		'head',
		'link',
		'meta',
		'title',

		'body',
		'a',
		'abbr',
		'blockquote',
		'br',
		'button',
		'code',
		'col',
		'colgroup',
		'div',
		'em',
		'form',
		'h1',
		'h2',
		'h3',
		'h4',
		'h5',
		'h6',
		'img',
		'input',
		'label',
		'li',
		'object',
		'ol',
		'option',
		'p',
		'span',
		'strong',
		'table',
		'textarea',
		'tbody',
		'td',
		'tfoot',
		'th',
		'thead',
		'tr',
		'ul',

		'noscript',
		'script',
		'style'
	];

	var attrs = [
		renamed ('class', 'class_attr'),
		'href',
		'id',
		'lang',
		'name',
		'src',
		renamed ('style', 'style_attr'),
		'type'
	];

	var FUNCTION_NAME = 'FUNCTION_NAME';
	var ITEM_NAME = 'ITEM_NAME';
	var BASE_FUNCTION = 'BASE_FUNCTION';

	var lineItems = A.group (
		'\tA.',
		A.include (FUNCTION_NAME),
		' = A.',
		A.include (BASE_FUNCTION),
		'.bind (undefined, \'',
		A.include (ITEM_NAME),
		'\');\n'
	);

	var TAGS = 'tags';
	var ATTRS = 'attrs';

	var template = A.template (
		'\t/* tags */\n',
		A.list (TAGS, lineItems),
		'\t/* attributes */\n',
		A.list (ATTRS, lineItems)
	);

	function createList (items, baseFunction) {
		var list = [];

		var def, functionName, itemName;

		var item, ii, ni = items.length;
		for (ii = 0; ii < ni; ii++) {
			item = items[ii];

			if (item instanceof RenamedItem) {
				functionName = item.renamed;
				itemName = item.original;

			} else {
				functionName = itemName = item;
			}

			def = {};

			def [FUNCTION_NAME] = functionName;
			def [BASE_FUNCTION] = baseFunction;
			def [ITEM_NAME] = itemName;

			list.push (def);
		}

		return list;
	}

	var tagList = createList (tags, 'tag');

	var attrList = createList (attrs, 'attr');

	var params = A.params (A.placeholders.nothing)
		.set (TAGS, tagList)
		.set (ATTRS, attrList);

	var code = A.string (params, template);

	out (code);
}

generateHtmlModuleCode ();
