// metaprogram script
// HTML templates
'use strict';

var out = function (arg) {
	console.log (arg);
};

var import_templates_pack = require ('../js/templates.pack');

var T = import_templates_pack.get_pack (
	{
		default_placeholder: import_templates_pack
			.modules.params.placeholders.no_placeholder
	});

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
	'meta',
	'title',

	'body',
	'a',
	'br',
	'div',
	'h1',
	'h2',
	'h3',
	'h4',
	'h5',
	'h6',
	'img',
	'p',
	'span',
	'table',
	'td',
	'th',
	'tr',

	'script',
	'style'
];

var attrs = [
	renamed ('class', 'class_attr'),
	'href',
	'id',
	'lang',
	'src',
	renamed ('style', 'inline_style')
];

var NAME_FUNCTION = 'NAME_FUNCTION';
var NAME_ITEM = 'NAME_ITEM';
var FUNCTION = 'FUNCTION';

var params = T.params ();

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
