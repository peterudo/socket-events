var server = require('./server'),
    client = require('./client');

module.exports = {
    create: function (/*[config], callback*/) {
        if (!1 in arguments) {
            arguments[1] = arguments[0];
            arguments[0] = {};
        }

        var instance = Object.create(server);
        instance.initialize.apply(instance, [].slice.call(arguments));

        return instance;
    },

    connect: function (port, host) {
        var instance = Object.create(client);
        instance.initialize(port, host);

        return instance;
    }
};