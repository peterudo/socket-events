var net = require('net');

var client = module.exports = {
	initialize: function (/*[socket], [port, host]*/) {
		if (typeof arguments[0] === 'number') {
			this._connect(arguments[0], arguments[1]);
		} else {
			this.socket = arguments[0];
		}
	},

	_connect: function (port, host) {
		this.socket = net.createConnection(port, host);
	},

	_defaultEvents: ['connect', 'data', 'end', 'timeout', 'drain', 'error', 'close'],

	on: function (event, callback) {
		if (this._defaultEvents.indexOf(event) !== -1) {
			return this.socket.on(event, callback);
		}

		this.events = this.events || {};
		this.events[event] = this.events[event] || [];

		this.events[event].push(callback);
	},

	trigger: function (event, data) {
		this.events = this.events || {};

		if (event in this.events) {
			this.events[event].forEach(function (callback) {

			});
		}
	},

	write: function (message) {
		this.socket.write(message);
	}
};