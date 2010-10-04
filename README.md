Function.Iterator.js - Copyright (c) 2010 [Olmo Maldonado](http://ibolmo.com/)
==============================================================================

I love generators, or at least I think I do. I first learned about generators from [Python's PEP 255](http://www.python.org/dev/peps/pep-0255/).

In my own words, generators constructs iterators. Python and [Mozilla's JavaScript 1.7](https://developer.mozilla.org/en/JavaScript/Guide/Iterators_and_Generators) have similar syntax for generators.
Unless you're using Rhino, however, you're not going to see that *sugar* any time soon in a portable environment.

I've been trying different variations of a good (generalized) solution that fills this portability gap, because I want to use generators -- or rather iterators _today_.

Keep in mind this is yet one variation, and I'd love for someone to come up with an awesome_er_ solution.

Check out the [Specs](http://github.com/ibolmo/Function.Iterator.js/tree/master//Specs/) for usage and also follow the How to Use section in this file.

Build
-----

Build via [Packager](http://github.com/kamicane/packager), requires MooTools Core to be registered to Packager already _(ty cpojer)_

	./packager register /path/to/Function.Iterator.js
	./packager build Funciton.Iterator.js/* > Function.Iterator.js

How to Use
----------
The premise is simple. You either add all the functions to the arguments of the constructor (`Function.Iterator`) or you dynamically add more functions to the iterator.

The first case is pretty basic, and not too exciting. Here's an example:

### Simple Iteration
		var iter = new Function.Iterator(function(){
			return 'a';
		}, function(){
			return 'b';
		}, function(){
			return 'c';
		});
		
		iter.each(function(character){
			console.log(character);
		});

Not exciting, like I said. Things get fun, though, when you push more functions.

### Push functions
	
		iter.push(function letterD(){
			return 'd';
		});
		
		// since we called each method, we're at the end of our list of functions
		// and iter.next() is the letterD function		
		console.log(iter.next()); // 'd'
		
		// every call to each method resets back to the beginning
		
		iter.each(function(character){
			console.log(character);
		});

Here's the fun part. What do you think would happen if I did the following?

### ?? Generator

		var counter = 0;
		var iter = new Function.Iterator(function next(){ // name your method instead of using argument.callee (deprecated in ES5)
			iter.push(next);
			counter++;
		});
		
		iter.next(); // counter = 1
		iter.next(); // counter = 2
		iter.next(); // counter = 3
		// ...
		// ...
		iter.next(); // counter = n
		
If you've answered it's an Endless, or non-stopping, or w00t generator than you'd be right.

**CAREFUL** 
If you're not careful, you will have an endless -- and non responsive situation.

### Doh! Generator

		var iter = new Function.Iterator(function next(){
			iter.push(next);
		});
		
		var result;
		while (result = iter.next()) console.log(result);  // you'll never stop!
		
As always the onus falls on the developer to watch out for these cases. You are given power, thus it is your responsiblity.

### How to Stop
Normal `Array.forEach` and even `Object::forEach` in [MooTools](http://mootools.net/) have no way of stopping your loops until they're finished.

`Function.Iterator`, however, comes with a nice `Function.Iterator.stop` function. This function will [throw an Exception](https://developer.mozilla.org/en/Core_JavaScript_1.5_Guide/Statements#throw_Statement) which the `each` method automatically catches to stop the looping. 

To be clear: if you're not using `each` and you call too many `next` your script **will throw an exception that needs to be handled**.

#### StopIteration Exception Example

		var iter = new Function.Iterator(function(){
			return 'first';
		});
		
		iter.next(); // 'first'
		iter.next(); // StopIteration Error!
		
#### Catch the Exception

		var iter = new Function.Iterator(function(){
			return 'first';
		});
		
		try {
			while (true) iter.next();
		} catch (StopIteration){
		}
		
		// script continues without disrupting the control flow
		
This gives `stop` its power. Use wisely:

#### Using Stop to Finish Iteration

		var counter = 0;
		var iter = new Function.Iterator(function next(){
			iter.push(next);
			counter += 5;
		});
		
		iter.each(function(){ // yes you can still use each
			if (counter > 20) iter.stop();
		});
		
		// or old school
		// option A
		counter = 0;
		try {
			while (counter < 20) iter.next();
		} catch (StopIteration){
		}
		
		//option B
		counter =- 0;
		try {
			while (true){
				iter.next();
				if (counter > 20) iter.stop();	// or break;
			}
		} catch (StopIteration){
		}

TODO
----

 * More meaningful examples: fib, co-routines
 * More helpful sugars: `skip`, `continue`
