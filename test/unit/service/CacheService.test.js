const CacheService = require('../../../lib/service/CacheService')
const CacheModel = require('../../../lib/model/CacheModel')
const Request = require('../../../lib/type/Request')
const Cache = require('../../../lib/type/Cache')

describe('CacheService', () => {
    
    describe('getCache', () => {
        
        test('should get the cache with success', async () => {            
            const data = '<html></html>'            
            const cacheModel = new CacheModel()
            cacheModel.retrieve = jest.fn(() => data)
            const cacheService = new CacheService()
            cacheService._cacheModel = cacheModel

            const request = new Request('/homepage', 'GET')
            const retrievedData = await cacheService.getCache(request)

            expect(retrievedData).toEqual(data)
            expect(cacheModel.retrieve).toHaveBeenCalled()
            expect(cacheModel.retrieve).toHaveBeenCalledWith(request)
        })

        test('should throw resource do not found', async () => {            
            const cacheModel = new CacheModel()
            cacheModel.retrieve = jest.fn(() => undefined)
            const cacheService = new CacheService()
            cacheService._cacheModel = cacheModel

            const request = new Request('/homepage', 'GET')
            try {
                await cacheService.getCache(request)
            } catch(error) {
                expect(error.message).toMatch('resource do not found')
            }

            expect(cacheModel.retrieve).toHaveBeenCalled()
            expect(cacheModel.retrieve).toHaveBeenCalledWith(request)
        })

    })

    describe('setCache', () => {
        test('should save cache with success', async () => {            
            const cacheModel = new CacheModel()
            cacheModel.save = jest.fn(() => {})
            const cacheService = new CacheService()
            cacheService._cacheModel = cacheModel

            const request = new Request('/homepage', 'GET')
            const cache = new Cache('<html></html>')
            await cacheService.setCache(request, cache)

            expect(cacheModel.save).toHaveBeenCalled()
            expect(cacheModel.save).toHaveBeenCalledWith(request, cache)
        })
    })

})