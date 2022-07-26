import request from 'supertest'
import fetchTokenPriceFunction from '../routes/fetchTokenPrice'
import { Response } from '../utils/make-api'
import { describeWithApp } from './test-setup'

describeWithApp('Token Tests', app => {
	it('fetches token price', async() => {
        const fetch = await fetchTokenPriceFunction('FRA');

        expect(fetch.data.data.quote).toBeDefined();
	})
})
