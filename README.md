April1
======
*(C) 2014 RoboterHund*

This project exists because the author wanted a templating system,
but did not want to use another language besides JavaScript.  
That's pretty much all the motivation behind this.

This approach to output generation is my personal preference.  
There is no guarantee about suitability of purpose, usability,
quality of vibes, etc.  
Your mileage may vary.

The basic idea behind this design is that a pure JS templating engine
would be:

 * *Faster*: **April1** does not need to parse an input string, so
 I expect it to perform better than a system that has to process
 a template written in a secondary language.
	
 * *Simpler*: now, this depends on how **April1** is used.
 I cannot guarantee that using this system is easier than using some
 other module.

 To get a basic idea, imagine writing, instead of this:
* * *
		# a template in some markup language
		# with 3 fields, 'le_image', 'the_id' and 'le_text'
		#
		<body>
			<img src="{{le_image}}"/>
			<p id="{{the_id}}">{{le_text}}</p>
		</body>
* * *
 , something like this:
* * *
		// JavaScript code (using April1) to create a template,
		// with the same fields
		//
		// note that this does not necessarily output HTML!
		// (this is explained later)
		//
		var body_template = T.template (
			T.body (
				T.img (
					T.src (T.include ('le_image'))
				),
				T.p (
					T.id (T.include ('the_id')),
					T.include ('le_text')
				)
			)
		);
* * *
 When comparing these two snippets,
 please consider the multiple factors
 that influence development, like:
 IDE/editor features, code complexity, etc.  
 There is a big difference between these two systems,
 and for this reason I won't claim (yet) that one is
 more suitable for you than the other.  
 Also note that currently **April1** does not auto-indent
 its output. Therefore, the output of the 2nd snippet
 will be one line, like this:

		<body><img src="..."><p id="...">...</p></body>

 Look at it the other way round, it's automatic
 whitespace compression!

 * *Easier to extend, or adapt for some other output*:
 The examples above show HTML output,
 but that is just my use case.

 Actually, **April1** has a minimal core, with extension
 functions, designed for a specific output, on top of this core.
	
 For example, in the sample code above, only
 `T.template` and `T.include` are core functions.
 	
 All other `T.*` functions (like `T.body`) are functions from
 the 2nd layer, the HTML template building module.  
 The 2nd layer is a thin wrapper of the 1st layer,
 the XML template building module. This module is, in turn,
 implemented with core functions.  
 These 2 layers are not part of the engine itself, and can
 be completely replaced, or not used at all.

 Unfortunately, this engine is hindered by the lack of
 multi-line strings in JavaScript... That's why it needs
 extension functions on top of the core to work as intended.
	
 Right now the only extension functions in this repo are
 some XML and HTML functions.

I hope that someone appreciates the ideas behind this engine.
Suggestions on how to improve it are very welcome.

*RoboterHund*  
*2014/04/01*