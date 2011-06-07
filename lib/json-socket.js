var net = require('net'),
    server = require('./server'),
    client = require('./client');

module.exports = {
    listen: function (object) {
        var instance;

        /**
         * Hack to find out what kind of object we're adding a listener to
         * instanceof only works on net.Server, and not on net.Socket
         *
         * Only the client instance (net.Socket) can perform write operations
         */
        if (typeof object.write === 'function') {
            instance = Object.create(client);
        } else {
            instance = Object.create(server);
        }

        instance.initialize(object);

        return instance;
    }
};