import { Chance } from 'chance'
import request from 'supertest'
import { IGrantApplicationRequest, IGrantCreateRequest, IWorkspaceCreateRequest, IWorkspaceUpdateRequest } from '../types'
import { Response } from '../utils/make-api'
import { describeWithApp } from './test-setup'

describeWithApp('Validation Tests', app => {

	it('should validate & upload a grant correctly', async() => {
		for(const appl of PASS_GRANTS) {
			await request(app)
				.post('/validate/grant-create')
				.send(appl)
				.expect(200)
				.then(
					({ body }: { body: Response<'validateGrantCreate'> }) => {
						expect(body.ipfsHash).toBeTruthy()
						expect(body.url).toMatch(/https:/)
					}
				)
		}
	})

	it('should validate & upload a workspace correctly', async() => {
		for(const appl of PASS_WORKSPACES) {
			await request(app)
				.post('/validate/workspace-create')
				.send(appl)
				.expect(200)
				.then(
					({ body }: { body: Response<'validateWorkspaceCreate'> }) => {
						expect(body.ipfsHash).toBeTruthy()
						expect(body.url).toMatch(/https:/)
					}
				)
		}
	})

	it('should validate & upload an application correctly', async() => {
		for(const appl of PASS_GRANT_APPLICATIONS) {
			await request(app)
				.post('/validate/grant-application-create')
				.send(appl)
				.expect(200)
				.then(
					({ body }: { body: Response<'validateGrantApplicationCreate'> }) => {
						expect(body.ipfsHash).toBeTruthy()
						expect(body.url).toMatch(/https:/)
					}
				)
		}
	})

	it('should validate & update a workspace correctly', async() => {
		for(const appl of PASS_WORKSPACE_UPDATES) {
			await request(app)
				.post('/validate/workspace-update')
				.send(appl)
				.expect(200)
				.then(
					({ body }: { body: Response<'validateWorkspaceUpdate'> }) => {
						expect(body.ipfsHash).toBeTruthy()
						expect(body.url).toMatch(/https:/)
					}
				)
		}
	})

	it('should fail to upload a grant', async() => {
		for(const appl of FAIL_APPS) {
			await request(app)
				.post('/validate/grant-create')
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
		reward: {
			committed: 100,
			asset: 'ETH'
		},
		releaseType: 'single',
		ownerId: chance.guid(),
		malicious_prop: '1234'
	},
	{
		title: chance.sentence(),
		description: chance.paragraph(),
		reward: {
			committed: 100,
			asset: 'ETH',
			mal_prop: '1232'
		},
		releaseType: 'single',
		ownerId: chance.guid()
	},
	{
		title: chance.sentence(),
		description: chance.paragraph(),
		reward: {
			value: 0,
			asset: 'ETH'
		},
		creatorId: chance.guid(),
		workspaceId: chance.guid(),
		fields: [...Array(5)].map(
			() => ({
				id: chance.guid(),
				title: chance.sentence(),
				inputType: chance.pickone(['short-form', 'long-form'])
			})
		)
	},
]

const PASS_GRANTS: IGrantCreateRequest[] = [
	{
		title: chance.sentence(),
		summary: chance.paragraph(),
		details: chance.paragraph(),
		reward: {
			committed: 100,
			asset: '0xA0A1'
		},
		creatorId: chance.guid(),
		workspaceId: chance.guid(),
		fields: [...Array(5)].map(
			() => ({
				id: chance.guid(),
				title: chance.sentence(),
				inputType: chance.pickone(['short-form', 'long-form'])
			})
		)
	},
	{
		title: chance.sentence(),
		summary: chance.paragraph(),
		details: chance.paragraph(),
		reward: {
			committed: 1.1,
			asset: '0xA0A2'
		},
		creatorId: chance.guid(),
		workspaceId: chance.guid(),
		fields: [...Array(1)].map(
			() => ({
				id: chance.guid(),
				title: chance.sentence(),
				inputType: chance.pickone(['short-form', 'long-form'])
			})
		)
	},
]

const PASS_WORKSPACES: IWorkspaceCreateRequest[] = [
	{
		title: chance.sentence(),
		about: chance.paragraph(),
		logoIpfsHash: chance.guid(),
		coverImageIpfsHash: chance.guid(),
		creatorId: chance.guid(),
		supportedNetworks: ['eth'],
		socials: [
			{ name: 'twitter', value: chance.url() },
			{ name: 'discord', value: chance.url() }
		]
	},
]


const PASS_GRANT_APPLICATIONS: IGrantApplicationRequest[] = [
	{
		grantId: chance.guid(),
		applicantId: chance.guid(),
		fields: {
			applicantName: chance.name(),
			applicantEmail: chance.email(),
			projectName: chance.name(),
			projectDetails: chance.paragraph(),
			fundingBreakdown: chance.paragraph(),
			...[...Array(4)].reduce(
				(dict, _, i) => ({
					...dict,
					[i.toString()]: chance.sentence()
				}), { }
			)
		},
		members: [...Array(3)].map(
			() => ({
				details: chance.paragraph()
			})
		),
		milestones: [...Array(5)].map(
			() => ({
				title: chance.sentence(),
				amount: chance.integer({ min: 1, max: 100 })
			})
		)
	},
]


const PASS_WORKSPACE_UPDATES: IWorkspaceUpdateRequest[] = [
	{
		title: chance.sentence(),
		about: chance.paragraph(),
		logoIpfsHash: chance.guid(),
		coverImageIpfsHash: chance.guid(),
		socials: [
			{ name: 'twitter', value: chance.url() },
			{ name: 'discord', value: chance.url() }
		]
	},
]