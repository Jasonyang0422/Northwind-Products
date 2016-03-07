var http = require('http');
var seed = require('./models/seed');
var app = require('./app');
var server = http.createServer();


server.on('request', app);

seed().then(function(){
	server.listen(3000, function(){
		console.log('server is running on port 3000');
	});
});
