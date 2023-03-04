const CacheModel = require('../../../lib/model/CacheModel')
const redisConnectionSingleton = require('../../../lib/infra/RedisConnectionSingleton')
const Request = require('../../../lib/type/Request')
const Cache = require('../../../lib/type/Cache')

async function saveHelper(key, data) {
    const connection = redisConnectionSingleton.getConnection()

    await connection.set(key, data)
}

async function retrieveHelper(key) {
    const connection = redisConnectionSingleton.getConnection()
    return await connection.get(key)
}


async function deleteAllHelper() {
    const connection = redisConnectionSingleton.getConnection()
    const keys = await connection.sendCommand(['KEYS', '*'])
    for await (const key of keys) {
        await connection.del(key)
    }
}

describe('CacheModel', () => {
    
    beforeAll(async () => {
        await redisConnectionSingleton.connect()
    })
    
    afterAll(async () => {
        await redisConnectionSingleton.disconnect()
    })
    
    beforeEach(async () => {
        await deleteAllHelper()
    })    
  
    describe('save', () => {

        test('should save cache with success', async () => {
            const cacheModel = new CacheModel()
            
            const request = new Request('/homepage', 'GET')
            const cache = new Cache('<html></html>')
            await cacheModel.save(request, cache)

            const retrievedData = await retrieveHelper(request.resource)
            expect(retrievedData).toBe(cache.data)
        })

    })

    describe('retrieve', () => {

        test('should retrieve cache with success', async () => {
            const resource = '/homepage'
            const data = '<html></html>'
            await saveHelper(resource, data)
            const cacheModel = new CacheModel()
            
            const request = new Request(resource, 'GET')            
            const retrievedData = await cacheModel.retrieve(request)

            expect(retrievedData).toBe(data)
        })

    })

    describe('removeAll', () => {

        test('should remove all cache with success', async () => {
            const resource = '/homepage'
            const data = '<html></html>'
            await saveHelper(resource, data)
            const cacheModel = new CacheModel()
            
            await cacheModel.removeAll()
            
            const retrievedData = await retrieveHelper(resource)
            expect(retrievedData).toBe(null)
        })

    })

})