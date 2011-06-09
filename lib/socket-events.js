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
        var instance;
        if (typeof object.write === 'function') {
            instance = socketClient.create(object);
        } else {
            instance = server.create(object);
        }

        return instance;
    },

    createConnection: function (port, host) {
        return this.listen(net.createConnection(port, host));
    }
};