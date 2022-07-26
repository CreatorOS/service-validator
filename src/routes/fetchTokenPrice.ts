const axios = require('axios')

const fetchTokenPriceFunction = async(symbol) => {
	let response = null as any
	new Promise(async(resolve, reject) => {
		try {
			response = await axios.get(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=${symbol}&convert=USD`, {
				headers: {
					'X-CMC_PRO_API_KEY': '9447d104-00b3-42db-8721-eef8e61a3332',
				},
			})
		} catch(ex) {
			response = null
			// error
			reject(ex)
		}

		if(response) {
			// success
			resolve(response)
			console.log(response.data.data.FRA[0].quote.USD.price)
		}
	})

	return {
		data: response!
	}
}

export default fetchTokenPriceFunction