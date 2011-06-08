module.exports = {
    create: function (socket) {
        var instance = Object.create(this);
        instance._initialize(socket);

        return instance;
    },

    _initialize: function (socket) {
        this.socket = socket;
        this._initCustomEventListener();
    },

    on: function (event, callback) {
        if (this._defaultEvents.indexOf(event) !== -1) {
            return this.socket.on(event, callback);
        }

        this.events = this.events || {};
        this.events[event] = this.events[event] || [];

        this.events[event].push(callback);
    },

    trigger: function (event, data) {
        data[this._CUSTOM_EVENT] = event;

        this.socket.write(JSON.stringify(data));
    },

    write: function (message) {
        this.socket.write(message);
    },

    end: function () {
        this.socket.end();
    },

    _defaultEvents: ['connect', 'data', 'end', 'timeout', 'drain', 'error', 'close'],

    _CUSTOM_EVENT: 'customEventToTrigger',

    _initCustomEventListener: function () {
        var that = this;

        this.on('data', function (data) {
            try {
                that._triggerCustomEvent(data.toString());
            } catch (error) {
                console.error('Failed to trigger custom event on ' + data.toString());
                console.error(error.message);
            }
        });
    },

    _triggerCustomEvent: function (data) {
        data = JSON.parse(data);

        var event = data[this._CUSTOM_EVENT];
        delete data[this._CUSTOM_EVENT];

        if (this.events && this.events[event]) {
            this.events[event].forEach(function (callback, i) {
                callback(data);
            });
        }
    }
};
