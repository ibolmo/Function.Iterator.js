

var iter = new Function.Iterator(function(){
	return 'a';
}, function(){
	return 'b';
}, function(){
	return 'c';
});

iter.push(function(){
	return 'd';
});

iter.each(function(character){
	console.log(character);
});

var iter = new Function.Iterator(function next(){
	this.next = next;
});

iter.each(function(value, i, iter){
	console.log(i);
	if (i == 5) iter.stop();
});
