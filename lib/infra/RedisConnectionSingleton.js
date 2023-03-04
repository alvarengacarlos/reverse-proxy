const {
	notStrictEqual
} = require('assert')

const { createClient } = require('redis')
const LoggerUtil = require('../util/LoggerUtil')
const config = require('../config')

class RedisConnectionSingleton {

	constructor() {
		this._client = null
	}

	getConnection() {
		LoggerUtil.info('RedisConnection::getConnection::getting redis connection')

		if (!config.IS_DEV_MODE) {
			notStrictEqual(this._client, null, Error('redis is not connected'))
		}

		LoggerUtil.info('RedisConnection::getConnection::got redis connection with success')
        
		return this._client
	}

	async connect() {
		LoggerUtil.info('RedisConnection::connect::connecting to redis')

		this._client = createClient({
			url: 'redis://redisDataBase:6379'
		})

		this._client.on('error', (error) => LoggerUtil.error(`RedisConnection::connection::connection error: ${error.message}`))

		await this._client.connect()

		LoggerUtil.info('RedisConnection::connect::connected with success')
	}
    
	async disconnect() {
		LoggerUtil.info('RedisConnection::disconnect::disconnecting of redis')

		await this._client.disconnect()

		LoggerUtil.info('RedisConnection::disconnect::disconnected with success')
	}

}

module.exports = new RedisConnectionSingleton()