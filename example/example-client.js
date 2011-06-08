var net = require('net'),
    socketEvents = require('../lib/socket-events');

/**
 * Create a standard net.Socket object
 */
var connection = net.createConnection(8124, 'localhost');


var socket = socketEvents.listen(connection);

socket.on('connect', function () {
    console.log("I just connected to the server...");
});

socket.on('event_on_client', function (data) {
    console.log('received JSON from server:');
    console.log(data);
});

setInterval(function () {
    console.log("\nSending data to server\n");
    socket.trigger('event_on_server', {
        data: 'sent to the server',
        from: 'the client'
    });
}, 3000);