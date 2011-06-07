var sock = require('../lib/json-socket');

var server = sock.create(function (client) {
	console.log('A new client connected...');

	client.on('data', function (data) {
		console.log(data.toString());
	});

//	client.trigger('init', { who: 'areyou?' });
});

server.listen(8124, 'localhost');


/*
var net = require('net');

var server = net.createServer(function (socket) {
	console.log(socket);
	socket.write("heihei");

	socket.on('data', function (data) {
		console.log(data.toString());
	});

	socket.on('connect', function (client) {
		console.log('someone connected');
	});

	socket.on('heihei', function () {
		console.log("HEIHEI");
	});

	setInterval(function () {
		socket.write(JSON.stringify({
			job: "job1"
		}));
	}, 1000);

});

server.listen(8124, 'localhost');
*/