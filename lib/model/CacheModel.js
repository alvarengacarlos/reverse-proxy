const redisConnectionSingleton = require('../infra/RedisConnectionSingleton')
const LoggerUtil = require('../util/LoggerUtil')

module.exports = class CacheModel {

    constructor() {
        this._redisConnection = redisConnectionSingleton.getConnection()
    }

    async save(request, cache) {
        LoggerUtil.info(`CacheModel::save::saving a cache with ${request.resource} key`)

        await this._redisConnection.set(request.resource, cache.data)

        LoggerUtil.info('CacheModel::save::saved with success')
    }
    
    async retrieve(request) {
        LoggerUtil.info(`CacheModel::retrieve::retrieving a cache with ${request.resource} key`)
        
        const data = await this._redisConnection.get(request.resource)

        LoggerUtil.info('CacheModel::retrieve::retrieved with success')

        return data
    }

    async removeAll() {
        LoggerUtil.info('CacheModel::removeAll::removing all cache')
        
        const keys = await this._redisConnection.sendCommand(['KEYS', '*'])
        for await (const key of keys) {
            LoggerUtil.info(`CacheModel::removeAll::removing ${key} key`)

            await this._redisConnection.del(key)

            LoggerUtil.info(`CacheModel::removeAll::${key} key removed with success`)
        }

        LoggerUtil.info('CacheModel::removeAll::removed all cache with success')
    }

}