var sock = require('../lib/json-socket');

var client = sock.connect(8124, 'localhost');

client.on('connect', function () {
	console.log("I just connected to the server...");
});

client.on('event_on_client', function (data) {
	console.log('received JSON from server:');
	console.log(data);
});

client.trigger('event_on_server', {
	data: 'sent to the server',
	from: 'the client'
});
