const CacheModel = require('../model/CacheModel')

module.exports = class CacheService {

    constructor() {
        this._cacheModel = new CacheModel()
    }    

    async getCache(request) {
        const resource = await this._cacheModel.retrieve(request)

        if(resource) {
            return resource
        }

        throw new Error('resource do not found')
    }

    async setCache(request, cache) {
        this._cacheModel.save(request, cache)
    }

}