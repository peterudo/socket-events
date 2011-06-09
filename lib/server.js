var socketServer = require('./socket/server');

module.exports = {
    create: function (server) {
        return Object.create(this)._initialize(server);
    },

    _initialize: function (server) {
        this.server = server;
        this._sockets = [];

        return this;
    },

    on: function (event, callback) {
        return this.server.on(event, this._wrapSocket.bind(this, callback));
    },

    broadcast: function () {
        var args = [].slice.call(arguments);
        args.unshift('broadcast');

        this._sockets.forEach(function (socket) {
            socket.trigger.apply(socket, args);
        });
    },

    addSocket: function (socket) {
        this._sockets.push(socket);
    },

    _wrapSocket: function (callback, netsocket) {
        var socket = socketServer.create(netsocket);
        this.addSocket(socket);

        callback(socket);
    }
};