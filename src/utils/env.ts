import logger from './logger'

export default () => {
	try {
		const dotenv = require('dotenv')
		const env = process.env.NODE_ENV || 'development'
		dotenv.config({ path: `.env.${env}` })
	} catch(error) {
		logger.debug('dotenv not found, did not load from file')
	}
}