const IS_TEST = process.env.NODE_ENV === 'test'

const axios = require('axios')

async function fetchTokenPriceFunction() {
	let response = null
	const amount = 1
	const symbol = 'BTC'
	new Promise(async(resolve, reject) => {
		try {
			response = await axios.get(`https://pro-api.coinmarketcap.com/v2/tools/price-conversion/items?=amount=${amount}&symbol=${symbol}`, {
				headers: {
					'X-CMC_PRO_API_KEY': '9447d104-00b3-42db-8721-eef8e61a3332',
				},
			})
		} catch(ex) {
			response = null
			// error
			console.log(ex)
			reject(ex)
		}

		if(response) {
			// success
			console.log(response)
			resolve(response)
		}
	})

	return {
		data: response
	}
}

export default fetchTokenPriceFunction