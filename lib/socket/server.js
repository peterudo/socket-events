var util = require('../util'),
    socket = require('./base');

var serverSocket = module.exports = {

};

util.mixin(serverSocket, socket);
