/*
---

name: Function.Iterator

description: An Iterator subclass specialized for functions.

authors: Olmo Maldonado (@ibolmo)

license: MIT-style license.

requires: [Core/Class]

provides: [Function.Iterator, StopIteration]

...
*/

(function(){

this.StopIteration = Error;

this.Function.Iterator = new Class({
	
	initialize: function(){
		this.items = Array.slice(arguments);
	},
	
	index: 0,
	
	stop: function(){
		throw StopIteration;
	},
	
	reset: function(){
		this.index = 0;
		return this;
	},
	
	push: function(){
		return Array.prototype.push.apply(this.items, arguments);
	},
	
	next: function(){
		return (this.items[this.index++] || this.stop).call(this);
	},
	
	each: function(fn, bind){
		var i = 0;
		this.reset();
		try {
			while (true) fn.call(bind, this.next(), i++, this);
		} catch (StopIteration){
		}
	}
	
});

})((typeof exports == 'undefined') ? this : exports);
