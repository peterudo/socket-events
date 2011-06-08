var socket = require('./socket');

module.exports = {
    create: function (socket) {
        var instance = Object.create(this);
        instance._initialize(socket);

        return instance;
    },

    _initialize: function (server) {
        this.server = server;
    },

    on: function (event, callback) {
        if (this._wrapEvents.indexOf(event) !== -1) {
            return this.server.on(event, this._wrapSocket.bind(this, callback));
        }

        return this.server.on(event, callback);
    },

    _wrapEvents: ['connection'],

    _wrapSocket: function (callback, netsocket) {
        callback(socket.create(netsocket));
    }
};