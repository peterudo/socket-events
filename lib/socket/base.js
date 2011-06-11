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

    /**
     * Add a event listener to the socket
     * `this.socket` is already a `EventEmitter` object
     */
    this.on = function (event, callback) {
        // bind the callback to `this`, so it can access the wrapper instead of the clean socket (net.Socket) object
        return this.socket.on(event, callback.bind(this));
    };

    /**
     * Alias to `on`
     */
    this.addEventListener = this.on;

    /**
     * Trigger a custom event on the other side of the socket
     *
     * First it write the data to the socket, telling an event is fired.
     * The other side then picks up the data, parsing and emitting it
     */
    this.trigger = function (event /*, arg1, arg2*/) {
        var args = [].slice.call(arguments);

        this.write(JSON.stringify(args));
    };

    /**
     * Alias of `trigger`
     */
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

    this._initCustomEventListener = function () {
        this.on('data', this._triggerCustomEvent.bind(this));
    };

    this._triggerCustomEvent = function (data) {
        try {
            this.socket.emit.apply(this.socket, JSON.parse(data));
        } catch (error) {
            console.error('Failed to trigger custom event on ' + data.toString());
            console.error(error.message);
        }
    };
};
