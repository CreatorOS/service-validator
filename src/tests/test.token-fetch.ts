import fetchTokenPriceFunction from '../routes/fetchTokenPrice'
import { describeWithApp } from './test-setup'

describeWithApp('Token Tests', app => {
	it('fetches token price', async() => {
		const fetch = await fetchTokenPriceFunction('FRA')

		expect(fetch.data.data.quote).toBeDefined()
	})
})
