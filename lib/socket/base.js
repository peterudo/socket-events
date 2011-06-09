/**
 * Base mixin for sockets
 */
module.exports = function () {
    this.create = function (socket) {
        return Object.create(this)._initialize(socket);
    };

    this._initialize = function (socket) {
        this.socket = socket;
        this._initCustomEventListener();

        return this;
    };

    this.on = function (event, callback) {
        return this.socket.on(event, callback);
    };

    this.trigger = function (event /*, arg1, arg2*/) {
        var args = [].slice.call(arguments);

        this.write(JSON.stringify(args));
    };

    this.dispatch = this.trigger;

    this.write = function (message) {
        if (!this.socket.writable) {
            return false;
        }

        return this.socket.write(message);
    };

    this.end = function () {
        return this.socket.end();
    };

    this._defaultEvents = ['connect', 'data', 'end', 'timeout', 'drain', 'error', 'close'];

    this._initCustomEventListener = function () {
        var that = this;

        this.on('data', function (data) {
            try {
                that._triggerCustomEvent(data.toString());
            } catch (error) {
                console.error('Failed to trigger custom event on ' + data.toString());
                console.error(error.message);
            }
        });
    };

    this._triggerCustomEvent = function (data) {
        var args = JSON.parse(data);

        this.socket.emit.apply(this.socket, args);
    };
};
