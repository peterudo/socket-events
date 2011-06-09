var net = require('net'),
    socketEvents = require('../lib/socket-events');

/**
 * It's also possible to reuse an existing connection by doing the following:
var connection = net.createConnection(8124, 'localhost'),
    socket = socketEvents.listen(connection);
 */

var socket = socketEvents.createConnection(8124, 'localhost');

socket.on('connect', function () {
    console.log("I just connected to the server...");
});

socket.on('event_on_client', function (data) {
    console.log('received JSON from server:');
    console.log(data);
});

socket.on('end', function () {
    socket.end();
});

socket.on('close', function (hadError) {
    process.exit(0);
});

setInterval(function () {
    console.log("\nSending data to server\n");
    socket.trigger('event_on_server', {
        data: 'sent to the server',
        from: 'the client'
    });
}, 3000);
