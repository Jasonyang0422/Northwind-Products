var Products = require('./db').Products;
var Promise = require('bluebird');

var names = ['foo', 'space here', 'Boston', 'NYU', 'Fullstack', 'New York', 'United States', 'Lays Crisp', 'Zhe Jiang', 'Zhou Shan'];
var descriptions = ['cool', 'nice', 'awesome', 'excellent', 'just so so', 'fantastic', 'odd', 'bad', 'weird'];
var active = [true, false];

var seed = function(){
 return Products.remove({})
	   .then(function(){
	   		names = names.map(function(name){
	   			var num1 = Math.floor(Math.random()*10);
	   			var num2 = Math.floor(Math.random()*10);
	   			var num3 = Math.floor(Math.random()*2);
	   			var des = descriptions[num1] + ' ' + descriptions[num2];
	   			return  Products.create({
	   						name: name,
	   						description: des,
	   						active: active[num3]
	   					}).then(console.log);
	   		});
	   		return Promise.all(names);
		});	
};

module.exports = seed;

