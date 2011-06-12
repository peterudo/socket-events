var net = require('net'),
    server = require('./server'),
    socketClient = require('./socket/client');

module.exports = {
    listen: function (object) {
        if (object instanceof net.Server) {
            return server.create(object);
        } else if (object instanceof net.Stream) {
            return socketClient.create(object);
        }
    },

    createConnection: function (port, host) {
        var args = [].slice.call(arguments);

        return this.listen(net.createConnection.apply(net, args));
    }
};