var net = require('net'),
    socketEvents = require('../lib/socket-events');

/**
 * Use your existing net.Server object
 */
var server = net.createServer();
server.listen(8124, 'localhost');


/**
 * Set it to listen to your server, and you're able trigger events on the client
 */
var socketServer = socketEvents.listen(server);

socketServer.on('connection', function (socket) {
    console.log('A new client connected...');

    /**
     * Use any number of arguments with data supported by JSON.stringify/parse
     */
    socket.on('event_on_server', function (arg1, arg2, json) {
        console.log('received JSON from a client:');
        console.log(arg1, arg2);
        console.log(json);
    });

    socket.on('heartbeat', function (time) {
        console.log("Heartbeat from: " + this.socket.fd, time);
    });
});

setInterval(function () {
    socketServer.broadcast('Broadcast from server');
}, 1000);
