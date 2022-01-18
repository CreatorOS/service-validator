import { Chance } from 'chance'
import request from 'supertest'
import { IGrantApplication } from '../types'
import { Response } from '../utils/make-api'
import { describeWithApp } from './test-setup'

describeWithApp('Validation Tests', app => {

	it('should validate & upload a grant correctly', async() => {
		for(const appl of PASS_APPS) {
			await request(app)
				.post('/validate')
				.send(appl)
				.expect(200)
				.then(
					({ body }: { body: Response<'validate'> }) => {
						expect(body.ipfsHash).toBeTruthy()
						expect(body.url).toMatch(/https:/)
					}
				)
		}
	})

	it('should fail to upload a grant', async() => {
		for(const appl of FAIL_APPS) {
			await request(app)
				.post('/validate')
				.send(appl)
				.expect(400)
		}
	})

})

const chance = new Chance()

const FAIL_APPS = [
	{

	},
	{
		title: chance.sentence(),
		description: chance.paragraph(),
		amount: {
			value: 100,
			token: 'ETH'
		},
		releaseType: 'single',
		ownerId: chance.guid(),
		malicious_prop: '1234'
	},
	{
		title: chance.sentence(),
		description: chance.paragraph(),
		amount: {
			value: 100,
			token: 'ETH',
			mal_prop: '1232'
		},
		releaseType: 'single',
		ownerId: chance.guid()
	},
	{
		title: chance.sentence(),
		description: chance.paragraph(),
		amount: {
			value: 0,
			token: 'ETH'
		},
		releaseType: 'single',
		ownerId: chance.guid(),
	},
]

const PASS_APPS: IGrantApplication[] = [
	{
		title: chance.sentence(),
		description: chance.paragraph(),
		amount: {
			value: 100,
			token: 'ETH'
		},
		releaseType: 'single',
		ownerId: chance.guid(),
	},
	{
		title: chance.sentence(),
		description: chance.paragraph(),
		amount: {
			value: 1.1,
			token: 'ETH'
		},
		releaseType: 'single',
		ownerId: chance.guid()
	},
]