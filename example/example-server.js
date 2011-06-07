var sock = require('../lib/json-socket');

var server = sock.create(function (client) {
    console.log('A new client connected...');

    client.on('event_on_server', function (data) {
        console.log('received JSON from a client:');
        console.log(data);
    });

    client.trigger('event_on_client', {
        data: 'sent from server',
        to: 'client'
    });
});

server.listen(8124, 'localhost');
