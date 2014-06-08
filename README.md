April1
======
&copy; 2014 RoboterHund

_Note_: experimental module, everything is subject to change.

* * *

**April1** is an *anti-template engine* for the Node.js platform.

This means that it aims to provide the same functionality as a typical
template engine, except that the template is defined directly in code.

Example:

	var A = require ('april1');
	var myTemplate = A.template (
		A.body (
			A.img (
				A.src (A.include ('URL'))
			),
			A.p (
				A.id (A.include ('ID')),
				A.include ('TEXT')
			)
		)
	);

The above code creates a reusable template.

Values are supplied by a *parameterizer*. Example:

    var myParams = A.params (A.placeholders.emptyString)
        .set ('URL', '/img/picture.png')
        .set ('ID', 'cont_42')
        .set ('TEXT', 'hello world');

Now, the function call ``A.string (myParams, myTemplate)``
would *by default* return this string:

	<body><img src="/img/picture.png"/><p id="cont_42">hello world</p></body>

***By default***.

* * *

unit tests
----------
The ``js-test`` folder contains some fixtures for the ``nunitjs`` unit test framework.

* * *

versions
--------

``0.0.1``
Initial version, published on 2014/04/01

``0.1.1``
Attempt to simplify node module export interface.

Restructured components with the aim of simplifying static analysis:
IDEs like IntelliJ should autocomplete and find the declaration
of all exported April1 functions and objects.

``0.1.2``
New functions:

* ``group`` allows to define subsequences of a template or templates
that are identical or similar to each other.

* ``list`` binds a subtemplate to an array of objects.

    Test module ``htmlTemplatesFixture`` demonstrates this.

* * *

``0.2.1``
Switched to camelCase everywhere.

`to_template` and `to_string` renamed to `aTemp` and `aStr`.

``0.2.2``
Currently under development: trying to make output more configurable.

*RoboterHund*  
*2014/06/08*

