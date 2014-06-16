// Array.forEach wrapper that distinguishes last line
'use strict';

function forEachNormalOrLastItem (lines, visitLine) {
	var isLast = false;
	var lineCount = 0;
	var lastLine = lines.length - 1;

	function visitLineWrapper (text) {
		visitLine (text, isLast);

		lineCount++;
		if (lineCount >= lastLine) {
			isLast = true;
		}
	}

	lines.forEach (visitLineWrapper);
}

module.exports = forEachNormalOrLastItem;
