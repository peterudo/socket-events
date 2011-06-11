var net = require('net'),
    server = require('./server'),
    socketClient = require('./socket/client');

module.exports = {
    listen: function (object) {
        /**
         * Hack to find out what kind of object we're adding a listener to
         * instanceof only works on net.Server, and not on net.Socket
         *
         * Only the server (net.Server) keeps track of connections
         */
        if (typeof object.connections === 'number') {
            return server.create(object);
        } else {
            return socketClient.create(object);
        }
    },

    createConnection: function (port, host) {
        var args = [].slice.call(arguments);

        return this.listen(net.createConnection.apply(net, args));
    }
};