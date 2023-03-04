const process = require('process')

const config = Object.freeze({
	IS_DEV_MODE: (process.env.IS_DEV_MODE == 'true') ? true : false,
})

module.exports = config