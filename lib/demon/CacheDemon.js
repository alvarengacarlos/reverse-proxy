const Demon = require('./Demon')
const TimerConverterUtil = require('../util/TimerConverterUtil')
const LoggerUtil = require('../util/LoggerUtil')
const CacheModel = require('../model/CacheModel')

module.exports = class CacheDemon extends Demon {

	constructor() {        
		super()
		this._cacheModel = new CacheModel()
	}

	init() {
		LoggerUtil.info('CacheDemon::init::initializing cache demon')
		const thirtyMinutes = 30
		const intervalToCleanerCache = TimerConverterUtil.secondsToMilliseconds(            
			TimerConverterUtil.minutesToSeconds(thirtyMinutes)
		)
        
		LoggerUtil.info(`CacheDemon::init::configuring execution interval with ${thirtyMinutes} minutes`)

		setInterval(async () => {
			await this._cleanerCache()
		}, intervalToCleanerCache)
        
		LoggerUtil.info('CacheDemon::init::cache demon initialized with success')
	}
        
	async _cleanerCache() {
		LoggerUtil.info('CacheDemon::_cleanerCache::cleaning cache')
        
		await this._cacheModel.removeAll()
        
		LoggerUtil.info('CacheDemon::_cleanerCache::cache cleaned with success')
	}
        
}
