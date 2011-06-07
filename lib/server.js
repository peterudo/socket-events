var client = require('./client');

module.exports = {
    initialize: function (server) {
        this.server = server;
    },

    wrapSocketClient: function (socket, callback) {
        var clientInstance = Object.create(client);
        clientInstance.initialize(socket);

        callback(clientInstance);
    },

    on: function (event, callback) {
        if (event === 'connection') {
            return this.server.on(event, (function (t) {
                return function (socket) {
                    t.wrapSocketClient(socket, callback);
                };
            }(this)));
        }

        return this.server.on(event, callback);
    }
};