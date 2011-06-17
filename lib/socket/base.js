var socketEvent = require('./event.js');

var EOL = "\0";

/**
 * Base mixin for sockets
 */
var baseSocket = module.exports = function () {
    this.create = function (socket) {
        return Object.create(this)._initialize(socket);
    };

    this._initialize = function (socket) {
        this.socket = socket;
        this.socket.setNoDelay(true);
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

    this.once = function (event, callback) {
        return this.socket.once(event, callback.bind(this));
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
    this.trigger = function (event /* [, arg1, arg2] */) {
        var args = [].slice.call(arguments);

        if (typeof args[args.length - 1] === 'function') {
            this.once(event, args.pop());
        }

        return this.write(JSON.stringify(args) + EOL);
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

    this._triggerCustomEvent = function (buffer) {
        var self = this,
            events = buffer.toString().split(EOL);

        events.pop(); // an empty event is always present

        events.forEach(function (data) {
            try {
                var eventData = JSON.parse(data),
                    event = eventData[0],
                    listeners = self.socket.listeners(event);

                listeners.forEach((function (t, eventData) {
                    var eData = eventData;
                    // Replace the event name, with an event object
                    eData[0] = socketEvent.create(event, t);

                    return function (callback) {
                        callback.apply(this.socket, eData);
                    };
                }(self, eventData)));

            } catch (error) {
                console.error('Failed to trigger custom event on ' + data);
                console.error(error.message);
            }
        });
    };
};
