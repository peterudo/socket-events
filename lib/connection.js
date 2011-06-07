var net = require('net'),
	socketClient = require('./client');

module.exports = {
	create: function (port, host) {
		var socket = Object.create(socketClient);
		socket.initialize(net.createConnection(port, host));

		return socket;
	}
};