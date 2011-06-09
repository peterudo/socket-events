var net = require('net'),
    socketEvents = require('../lib/socket-events');

/**
 * Use your existing net.Server object
 */
var server = net.createServer();
server.listen(8124, 'localhost');


/**
 * Set json-socket to listen to your server, and you're able trigger events on the client
 */
var socketServer = socketEvents.listen(server);

socketServer.on('connection', function (socket) {
    console.log('A new client connected...');

    socket.on('event_on_server', function (data) {
        console.log('received JSON from a client:');
        console.log(data);
    });

    var intervalId = setInterval(function () {
        console.log("\nSending data to client\n");
        socket.trigger('event_on_client', {
            data: 'sent from server',
            to: 'client'
        });
    }, 2500);

    socket.on('end', function () {
        socket.end();
    });

    socket.on('close', function (hadError) {
        clearInterval(intervalId);
    });
});

