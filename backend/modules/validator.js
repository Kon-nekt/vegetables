const assert = require('assert');

module.exports = {
    string(value) {
        assert.strictEqual(typeof value, 'string');
    },

    number(value) {
        assert.strictEqual(typeof value, 'number');
    },

    object(value) {
        assert.strictEqual(typeof value, 'object');
    },

    boolean(value) {
        assert.strict(typeof value, 'boolean');
    },

    array(value) {
        assert.strictEqual(Array.isArray(value), true);
    },

    isSafeInteger(value) {
        this.number(value);

        Number.isSafeInteger(value);
    },
};
