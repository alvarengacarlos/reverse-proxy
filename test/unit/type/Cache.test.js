const Cache = require('../../../lib/type/Cache')

describe('Cache', () => {

    describe('constructor', () => {

        test('should create a cache instance with success', () => {
            expect(new Cache('<html></html>') instanceof Cache).toBe(true)
        })

        test('should throw data must be string type', () => {
            expect(() => new Cache(null)).toThrow('data must be string type')
            expect(() => new Cache(undefined)).toThrow('data must be string type')
            expect(() => new Cache(1)).toThrow('data must be string type')
            expect(() => new Cache(0x1)).toThrow('data must be string type')
            expect(() => new Cache(0b1)).toThrow('data must be string type')
            expect(() => new Cache([])).toThrow('data must be string type')
        })

    })

})