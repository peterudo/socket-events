var net = require('net'),
    jsonsocket = require('../lib/json-socket');

/**
 * Create a standard net.Socket object
 */
var connection = net.createConnection(8124, 'localhost');


var client = jsonsocket.listen(connection);

client.on('connect', function () {
    console.log("I just connected to the server...");
});

client.on('event_on_client', function (data) {
    console.log('received JSON from server:');
    console.log(data);
});

setInterval(function () {
    console.log("\nSending data to server\n");
    client.trigger('event_on_server', {
        data: 'sent to the server',
        from: 'the client'
    });
}, 3000);