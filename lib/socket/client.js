var util = require('../util'),
    socket = require('./base');

var clientSocket = module.exports = {

};

util.mixin(clientSocket, socket);
