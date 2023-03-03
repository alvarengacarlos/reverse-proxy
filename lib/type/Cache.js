const {
    strictEqual
} = require('assert')

module.exports = class Cache {

    constructor(data) {
        this.data = this._parseData(data)
    }

    _parseData(data) {
        const isString = typeof data == 'string'
        strictEqual(isString, true, Error('data must be string type'))

        return data
    }

}