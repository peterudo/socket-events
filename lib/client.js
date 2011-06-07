var net = require('net'),
	sys = require('sys');

var client = module.exports = {
	initialize: function (/*[socket], [port, host]*/) {
		if (typeof arguments[0] === 'number') {
			this._connect(arguments[0], arguments[1]);
		} else {
			this.socket = arguments[0];
		}

		this._initCustomEventListener();
	},

	on: function (event, callback) {
		if (this._defaultEvents.indexOf(event) !== -1) {
			return this.socket.on(event, callback);
		}

		this.events = this.events || {};
		this.events[event] = this.events[event] || [];

		this.events[event].push(callback);
	},

	trigger: function (event, data) {
		data[this._CUSTOM_EVENT] = event;

		this.socket.write(JSON.stringify(data));
	},

	write: function (message) {
		this.socket.write(message);
	},

	_connect: function (port, host) {
		this.socket = net.createConnection(port, host);
	},

	_defaultEvents: ['connect', 'data', 'end', 'timeout', 'drain', 'error', 'close'],

	_CUSTOM_EVENT: 'customEventToTrigger',

	_initCustomEventListener: function () {
		var that = this;

		this.on('data', function (data) {
			try {
				that._triggerCustomEvent(data.toString());
			} catch (error) {
				console.error('Failed to trigger custom event on ' + data.toString());
				console.error(error.message);
			}
		});
	},

	_triggerCustomEvent: function (data) {
		data = JSON.parse(data);

		var event = data[this._CUSTOM_EVENT];
		delete data[this._CUSTOM_EVENT];

		if (this.events && this.events[event]) {
			this.events[event].forEach(function (callback, i) {
				callback(data);
			});
		}
	}
};
