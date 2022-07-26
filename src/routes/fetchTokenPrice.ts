const axios = require('axios')

const fetchTokenPriceFunction = async(amount, symbol) => {
	let response = null
	new Promise(async(resolve, reject) => {
		try {
			response = await axios.get(`https://pro-api.coinmarketcap.com/v2/tools/price-conversion?amount=${amount}&symbol=${symbol}&convert=USD`, {
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
		data: response!
	}
}

export default fetchTokenPriceFunction