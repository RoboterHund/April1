// lines-to-file writer
'use strict';

/**
 * @callback LineWriter
 * @param {string}
 */

/**
 * @callback LinesGenerator
 * @param {LineWriter}
 */

/**
 * write to file
 * @param {string} outputPath
 * @param {LinesGenerator} outputGenerator
 */
function write (outputPath, outputGenerator) {
	var fs = require ('fs');
	var stream = fs.createWriteStream (outputPath);

	function writeOutput (text) {
		stream.write (text || '');
	}

	outputGenerator (writeOutput);

	stream.end ();
}

module.exports = write;
