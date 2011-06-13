var net = require('net'),
    socketEvents = require('../lib/socket-events');


var socket = socketEvents.createConnection(8124, 'localhost');

socket.on('connect', function () {
    console.log("I just connected to the server...");
});

socket.on('broadcast', function (data) {
    console.log(data);
});

socket.on('end', function () {
    socket.end();
});

socket.on('close', function (hadError) {
    process.exit(0);
});

socket.trigger('event_on_server', 'Argument 1', 'Argument 2', { json: 'data' });

setInterval(function () {
    socket.trigger('heartbeat', new Date().getTime());
}, 2500);
