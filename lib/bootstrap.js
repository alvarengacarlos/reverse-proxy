const process = require('process')

const LoggerUtil = require('./util/LoggerUtil')
const redisConnectionSingleton = require('./infra/RedisConnectionSingleton')
const CacheDemon = require('./demon/CacheDemon')

module.exports = function bootstrap() {
    redisConnectionSingleton.connect()
        .then(() => {
            new CacheDemon().init()

        })
        .catch((error) => {
            LoggerUtil.error(error)
            process.exit(1)

        }).finally(() => {
            LoggerUtil.info('bootstrap::bootstrap::Reverse Proxy initialized with success')
        })        
}