// lines-to-file writer
'use strict';

/**
 * read file lines
 * replace certain lines with another content
 * write resulting lines to another file
 *
 * @param basePath
 * @param outputPath
 * @param map_lineContent_replacementGenerator
 *  map of line in base file to generator of replacement content
 */
function generate (
	basePath, outputPath, map_lineContent_replacementGenerator) {

	var fs = require ('fs');

	var baseLines = fs.readFileSync (basePath).toString ().split ('\n');

	var writeStream = fs.createWriteStream (outputPath);

	var sep = '';

	function writeLine () {
		writeStream.write (sep);

		var arg, ia, na = arguments.length;
		for (ia = 0; ia < na; ia++) {
			arg = arguments [ia];

			writeStream.write (arg);
		}

		sep = '\n';
	}

	function processLine (text) {
		var replacementGenerator =
			map_lineContent_replacementGenerator [text.trim ()];

		if (replacementGenerator) {
			console.log (text);
			replacementGenerator (writeLine);

		} else {
			writeLine (text);
		}

		sep = '\n';
	}

	baseLines.forEach (processLine);

	writeStream.end ();
}

module.exports = generate;
