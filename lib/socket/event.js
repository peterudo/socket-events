

var socketEvent = module.exports = {
    create: function (event, socket) {
        return Object.create(this)._initialize(event, socket);
    },

    _initialize: function (event, socket) {
        this.event = event;
        this.socket = socket;

        return this;
    },

    respond: function (/* [arg1, arg2] */) {
        var args = [].slice.call(arguments);
        args.unshift(this.event);

        this.socket.trigger.apply(this.socket, args);
    }
};