// metaprogram script
// HTML templates
'use strict';

function generate_html_module_code () {
	var out = function (arg) {
		console.log (arg);
	};

	var T = {};
	var module_params = {
		extend          : T,
		list_module     : T,
		templates_module: T,
		xml_module      : T
	};
	require ('../js/linked_list') (module_params);
	require ('../js/parameters') (module_params);
	require ('../js/templates') (module_params);

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
		renamed ('style', 'inline_style'),
		'type'
	];

	var NAME_FUNCTION = 'NAME_FUNCTION';
	var NAME_ITEM = 'NAME_ITEM';
	var FUNCTION = 'FUNCTION';

	var params = T.params (require ('../js/placeholders').no_placeholder);

	var line_template = T.template (
		'\thtml_module.',
		T.include (NAME_FUNCTION),
		' = X.',
		T.include (FUNCTION),
		'.bind (undefined, \'',
		T.include (NAME_ITEM),
		'\');\n'
	);
	params.set (FUNCTION, 'tag');
	var tag_line_template = T.template (
		params,
		line_template
	);
	params.set (FUNCTION, 'attr');
	var attr_line_template = T.template (
		params,
		line_template
	);

	var generator = T.generator ();

	var append_lines = function (items, template) {
		var ii, ni = items.length;
		for (ii = 0; ii < ni; ii++) {
			var item = items [ii];

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
