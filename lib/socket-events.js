var net = require('net'),
    server = require('./server'),
    client = require('./client');

module.exports = {
    listen: function (object) {

        /**
         * Hack to find out what kind of object we're adding a listener to
         * instanceof only works on net.Server, and not on net.Socket
         *
         * Only the client instance (net.Socket) can perform write operations
         */
        var instance;
        if (typeof object.write === 'function') {
            instance = client.create(object);
        } else {
            instance = server.create(object);
        }

        return instance;
    }
};