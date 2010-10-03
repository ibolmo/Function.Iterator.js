/*
---

...
*/

(function(){

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
		iter.reset();
		try {
			while (true) fn.call(bind, this.next(), i++, iter);
		} catch (StopIteration){
		}
	}
	
});

})((typeof exports == 'undefined') ? this : exports);
