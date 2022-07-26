import request from 'supertest'
import { describeWithApp } from './test-setup'

describeWithApp('Token Tests', app => {
	it('fetches token price', async() => {
		await request(app).get('/fetch/token-price').query('BTC').expect(200)
	})
})
