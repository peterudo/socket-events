module.exports = {
    mixin: function (object /*, mixinFunction1, mixinFunction2...*/) {
        var mixins = [].slice.call(arguments, 1);

        mixins.forEach(function (mixin) {
            mixin.call(object);
        });

        return object;
    }
};