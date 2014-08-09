April1
======
&copy; 2014 RoboterHund

_Note_:

1. Still in early development stage. Things may change.
2. XML and HTML output was removed in
0.3.1 – moved to [april1-html](https://www.npmjs.org/package/april1-html).


* * *

**April1** is a general-purpose, extensible template engine for the Node.js platform.

Main characteristics:

- **Not coupled to any syntax**.
Templates are defined in plain JS.
	The extremely simple data structures can be (de)serialized by other packages.
- **Separate components**.
Designed for easy overriding
without breaking other parts,
thanks to a well-defined set of constraints.

This is the core module.
It provides basic functionality for more specialized modules.

Simple example:

	var A = require ('april1');
	var template = A.template (
		'Hello, ',
		A.insert ('who'),
		'.',
		A.list (
			'then',
			' ',
			A.insert ('item'),
			'.'
		)
	);

The above code creates a reusable template.

Values are supplied afterwards:

	var values = {
		who: 'World',
		then: [
			{ item: 1 },
			{ item: 2 },
			{ item: 3 }
		]
	};

Now, the function call ``A.string (template, values)``
would *by default* return this string:

	Hello, World. 1. 2. 3.

***By default***.

* * *

unit tests
----------
The ``test`` folder contains a test script. It is rudimentary, but has good coverage.

* * *

versions
--------

``0.2.2``  
This is the last version to include support for XML and HTML generation.

``0.3.1``  
Complete redesign.

- Reduced main module to core functions.
- More flexibility, more exported functions, simpler components.

``0.3.2 - 0.3.3``  
Redesign of `common` module, to facilitate extension.  
README update with link to `april1-html`.

``0.4.1``  
Templates are also nodes.  
Less classes.  
Removed the concept of 'template builder state'.

``0.4.2 - 0.4.3``  
Node processing (`modules.dispatch`) is now more flexible:

- The key to retrieve the dispatch table is no longer hard-coded. (`.2`)
- The dispatch table can be passed directly as argument. (`.3`)
- Added function to process single node instead of array. (`.3`)

*RoboterHund*  
*2014-08-09*
