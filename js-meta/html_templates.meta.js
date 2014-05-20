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

	var NAME_FUNCTION = 'NAME_FUNCTION';
	var NAME_ITEM = 'NAME_ITEM';
	var FUNCTION = 'FUNCTION';

	var params = A.params (A.placeholders.nothing);

	var line_template = A.template (
		'\tA1.',
		A.include (NAME_FUNCTION),
		' = A1.',
		A.include (FUNCTION),
		'.bind (undefined, \'',
		A.include (NAME_ITEM),
		'\');\n'
	);
	params.set (FUNCTION, 'tag');
	var tag_line_template = A.template (
		params,
		line_template
	);
	params.set (FUNCTION, 'attr');
	var attr_line_template = A.template (
		params,
		line_template
	);

	var generator = A.generator ();

	var append_lines = function (items, template) {
		var ii, ni = items.length;
		var item;
		for (ii = 0; ii < ni; ii++) {
			item = items [ii];

			if (item instanceof RenamedItem) {
				generator.put (
					params
						.set (NAME_ITEM, item.original)
						.set (NAME_FUNCTION, item.renamed),
					template
				);

			} else {
				generator.put (
					params
						.set (NAME_ITEM, item)
						.set (NAME_FUNCTION, item),
					template
				);
			}
		}
	};

	generator.append ('\t/* tags */\n');

	append_lines (tags, tag_line_template);

	generator.append ('\t/* attributes */\n');

	append_lines (attrs, attr_line_template);

	out (generator.get_result ());
}

generate_html_module_code ();
