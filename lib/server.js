var net = require('net'),
	socketClient = require('./client');

module.exports = {
	initialize: function (callback) {
		this.callback = callback;

		this.server = net.createServer((function (t) {
			return function (socket) {
				t.initializeSocketClient(socket);
			};
		}(this)));
	},

	initializeSocketClient: function (socket) {
		var client = Object.create(socketClient);
		client.initialize(socket);

		this.callback(client);
	},

	listen: function (port, host) {
		this.server.listen(port, host);
	}
};