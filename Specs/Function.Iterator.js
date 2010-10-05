
describe('Function.Iterator.js', function(){
	
	it('accepts any number of functions', function(){
		var iter = new Function.Iterator();
		expect(iter.items.length).toBe(0);
		
		iter = new Function.Iterator(function(){}, function(){});
		expect(iter.items.length).toBe(2);
	});

	it('provides StopIteration Error object', function(){
		new StopIteration();
	});
	
	it('throws StopIteration when there is no next function', function(){
		var iter = new Function.Iterator();
		expect(function(){ iter.next(); }).toThrow(StopIteration);
		
		var i = 0;
		iter = new Function.Iterator(function(){ i++ }, function(){ i++ });
		
		expect(function(){
			 // Being careful not to run forever before testing
			for (var j = 0; j < 5; j++) iter.next();
		}).toThrow(StopIteration);
		expect(i).toBe(2);
	});
	
	it('can push more functions to iterate', function(){
		var iter = new Function.Iterator();
		iter.push(function(){ return 'a'; });
		
		expect(iter.items.length).toBe(1);
		expect(iter.items[0]()).toBe('a');
		
		iter = new Function.Iterator(function(){ return 'b'; });
		iter.push(function(){ return 'c'; }, function(){ return 'd'; });
		
		expect(iter.items.length).toBe(3);
		expect(iter.items[0]()).toBe('b');
		expect(iter.items[1]()).toBe('c');
		expect(iter.items[2]()).toBe('d');
	});
	
	it('will return the generated value, or undefined', function(){
		var iter = new Function.Iterator(function(){
			return 'first';
		}, function(){
			return 'second';		
		}, function(){
		});
		
		expect(iter.next()).toBe('first');
		expect(iter.next()).toBe('second');
		expect(iter.next()).toBe(undefined);
	});
	
	it('can iterate through each of the functions', function(){
		var iter = new Function.Iterator(function(){
			return 'first';
		}, function(){
			return 'second';		
		});
		
		var results = [], count = 0, lastIndex = -1;
		iter.each(function(current, i){
			results.push(current);
			count++;
			lastIndex = i;
		});
		
		expect(results.length).toBe(2);
		expect(results[0]).toBe('first');
		expect(results[1]).toBe('second');
		expect(count).toBe(2);
		expect(lastIndex).toBe(1);
	});
	
	xit('can skip, or continue, to the next iteration', function(){
		
	});
});
