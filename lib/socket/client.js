var util = require('../util'),
    baseSocket = require('./base');

var clientSocket = module.exports = {

};

util.mixin(clientSocket, baseSocket);
