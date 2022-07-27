import axios from 'axios'

const fetchTokenPrice = async(symbol) => {
	let response = null as any
	try {
		response = await axios.get(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=${symbol}&convert=USD`, {
			headers: {
				'X-CMC_PRO_API_KEY': process.env.CMC_PRO_API_KEY!,
			},
		})
	} catch(ex) {
		response = null
	}

	if(response) {
		console.log(response.data)
		return {
			data: response!
		}
	}
}

export default fetchTokenPrice