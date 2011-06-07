var sock = require('../lib/json-socket');

var client = sock.connect(8124, 'localhost');

client.on('connect', function () {
	console.log("I just connected to the server...");
});

client.on('init', function (data) {
	console.log('received JSON from server:');
	console.log(data);
});

/*
var VTC = require('VTC'),
	ffmpeg = require('VTC/ffmpeg');

var connection = VTC.connect(8124, 'localhost', {
	heartbeat: 10
});

connection.workerInfo({
	name: 'frode-ffmpeg-client',
	bandwidth: 100000,
	parallell: 1
});

connection.receiveJob(function (job) {
	ffmpeg.do(job);
});


connection.on('connect', function (connection) {
	console.log('connected to server...');
});

connection.on('new_job', function (info) {
	console.log(info.worker.name + ' received job');
});


var net = require('net');

var socket = net.createConnection(8124, 'localhost');

socket.on('connect', function () {
	console.log('connected to server...');
});

socket.on('data', function (message) {
	try {
		var data = message.toString();
		console.log(JSON.parse(data));
	} catch (err) {
		console.log(err);
	}
});

setInterval(function () {
	socket.write('from client');
}, 1000);
 */

