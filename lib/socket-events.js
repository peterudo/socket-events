var net = require('net'),
    server = require('./server'),
    socketClient = require('./socket/client');

module.exports = {
    listen: function (object) {
        /**
         * Hack to find out what kind of object we're adding a listener to
         * instanceof only works on net.Server, and not on net.Socket
         *
         * Only the socket instance (net.Socket) can perform write operations
         */
        if (typeof object.write === 'function') {
            return socketClient.create(object);
        } else {
            return server.create(object);
        }
    },

    createConnection: function (port, host) {
        var args = [].slice.call(arguments);

        return this.listen(net.createConnection.apply(net, args));
    }
};