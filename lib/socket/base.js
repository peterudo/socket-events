module.exports = function () {
    this.create = function (socket) {
        var instance = Object.create(this);
        instance._initialize(socket);

        return instance;
    };

    this._initialize = function (socket) {
        console.log(socket);
        this.socket = socket;
        this._initCustomEventListener();
    };

    this.on = function (event, callback) {
        if (this._defaultEvents.indexOf(event) !== -1) {
            return this.socket.on(event, callback);
        }

        this.events = this.events || {};
        this.events[event] = this.events[event] || [];

        this.events[event].push(callback);
    };

    this.trigger = function (event, data) {
        data[this._CUSTOM_EVENT] = event;

        this.write(JSON.stringify(data));
    };

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

    this._CUSTOM_EVENT = 'customEventToTrigger';

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
        data = JSON.parse(data);

        var event = data[this._CUSTOM_EVENT];
        delete data[this._CUSTOM_EVENT];

        if (this.events && this.events[event]) {
            this.events[event].forEach(function (callback, i) {
                callback(data);
            });
        }
    };
};
