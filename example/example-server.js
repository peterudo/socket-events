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
var socket = socketEvents.listen(server);

socket.on('connection', function (client) {
    console.log('A new client connected...');

    client.on('event_on_server', function (data) {
        console.log('received JSON from a client:');
        console.log(data);
    });

    setInterval(function () {
        console.log("\nSending data to client\n");
        client.trigger('event_on_client', {
            data: 'sent from server',
            to: 'client'
        });
    }, 2500);
});

