var socket = require('./socket');

module.exports = {
    create: function (server) {
        var instance = Object.create(this);
        instance._initialize(server);

        return instance;
    },

    _initialize: function (server) {
        this.server = server;
    },

    on: function (event, callback) {
        // Selected events should wrap the returned net.Socket object in our wrapper
        if (this._wrapEvents.indexOf(event) !== -1) {
            return this.server.on(event, this._wrapSocket.bind(this, callback));
        }

        return this.server.on(event, callback);
    },

    _wrapEvents: ['connection'],

    _wrapSocket: function (callback, netsocket) {
        callback(socket.server.create(netsocket));
    }
};