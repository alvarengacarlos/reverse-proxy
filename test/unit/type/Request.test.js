const Request = require('../../../lib/type/Request')

describe('Request', () => {
    
    describe('constructor', () => {
        
        test('should create a request instance with success', () => {
            expect(new Request('/homepage', 'GET') instanceof Request).toBe(true)
        })

        test('should throw resource must be string type', () => {
            expect(() => new Request(null, 'GET')).toThrow('resource must be string type')
            expect(() => new Request(undefined, 'GET')).toThrow('resource must be string type')
            expect(() => new Request(1, 'GET')).toThrow('resource must be string type')
            expect(() => new Request(0x1, 'GET')).toThrow('resource must be string type')
            expect(() => new Request(0b1, 'GET')).toThrow('resource must be string type')
            expect(() => new Request([], 'GET')).toThrow('resource must be string type')
        })

        test('should throw means must be string type', () => {
            expect(() => new Request('/homepage', null)).toThrow('means must be string type')
            expect(() => new Request('/homepage', undefined)).toThrow('means must be string type')
            expect(() => new Request('/homepage', 1)).toThrow('means must be string type')
            expect(() => new Request('/homepage', 0x1)).toThrow('means must be string type')
            expect(() => new Request('/homepage', 0b1)).toThrow('means must be string type')
            expect(() => new Request('/homepage', [])).toThrow('means must be string type')
        })
        
        test('should throw means must be GET', () => {
            expect(() => new Request('/homepage', 'POST')).toThrow('means must be GET')
            expect(() => new Request('/homepage', 'PUT')).toThrow('means must be GET')            
        })

    })

})