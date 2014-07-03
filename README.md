April1
======
&copy; 2014 RoboterHund

_Note_:

1. Still in early development stage. Things may change.
2. XML and HTML output was removed in
0.3.1 – will be moved to separate package.

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

- Reduced main module to core functions.
- Complete redesign.
More flexibility, more exported functions, simpler components.

*RoboterHund*  
*2014/07/03*

