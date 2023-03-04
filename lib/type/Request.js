const LoggerUtil = require('../util/LoggerUtil')
const {
	strictEqual
} = require('node:assert')

module.exports = class Request {

	constructor(resource, means) {        
		this.resource = this._parseResource(resource)
		this.means = this._parseMeans(means)
	}

	_parseResource(resource) {
		LoggerUtil.info('Request::_parseResource::parsing resource')
        
		const isString = typeof resource == 'string'        
		strictEqual(isString, true, Error('resource must be string type'))        
        
		LoggerUtil.info('Request::_parseResource::resource parsed with success')
        
		return resource
	}
    
	_parseMeans(means) {
		LoggerUtil.info('Request::_parseMeans::parsing means')
        
		const isString = typeof means == 'string'
		strictEqual(isString, true, Error('means must be string type'))
        
		strictEqual(String(means).toUpperCase(), 'GET', Error('means must be GET'))

		LoggerUtil.info('Request::_parseMeans::means parsed with success')

		return means
	}

}