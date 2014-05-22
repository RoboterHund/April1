// metaprogram script
// HTML templates
'use strict';

function generate_html_module_code () {
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

	var line_items = A.group (
		'\tA1.',
		A.include (FUNCTION_NAME),
		' = A1.',
		A.include (BASE_FUNCTION),
		'.bind (undefined, \'',
		A.include (ITEM_NAME),
		'\');\n'
	);

	var TAGS = 'tags';
	var ATTRS = 'attrs';

	var template = A.template (
		'\t/* tags */\n',
		A.list (TAGS, line_items),
		'\t/* attributes */\n',
		A.list (ATTRS, line_items)
	);

	function create_list (items, base_function) {
		var list = [];

		var def, function_name, item_name;

		var item, ii, ni = items.length;
		for (ii = 0; ii < ni; ii++) {
			item = items[ii];

			if (item instanceof RenamedItem) {
				function_name = item.renamed;
				item_name = item.original;

			} else {
				function_name = item_name = item;
			}

			def = {};

			def [FUNCTION_NAME] = function_name;
			def [BASE_FUNCTION] = base_function;
			def [ITEM_NAME] = item_name;

			list.push (def);
		}

		return list;
	}

	var tag_list = create_list (tags, 'tag');

	var attr_list = create_list (attrs, 'attr');

	var params = A.params (A.placeholders.nothing)
		.set (TAGS, tag_list)
		.set (ATTRS, attr_list);

	var code = A.string (params, template);

	out (code);
}

generate_html_module_code ();
