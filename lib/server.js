var client = require('./client');

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
            return this.server.on(event, (function (t) {
                return function (socket) {
                    t._wrapClient(socket, callback);
                };
            }(this)));
        }

        return this.server.on(event, callback);
    },

    _wrapEvents: ['connection'],

    _wrapClient: function (socket, callback) {
        callback(client.create(socket));
    }
};