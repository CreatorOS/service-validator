import request from 'supertest'
import fetchTokenPriceFunction from '../routes/fetchTokenPrice'
import { Response } from '../utils/make-api'
import { describeWithApp } from './test-setup'

describeWithApp('Token Tests', app => {
	it('fetches token price', async() => {
        const fetch = await fetchTokenPriceFunction(1, 'BTC');

        expect(fetch.data).toBeDefined();

        console.log(fetch.data)
	})
})
