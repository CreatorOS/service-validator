import { Chance } from 'chance'
import request from 'supertest'
import { IGrantApplicationRequest, IGrantCreateRequest, IGrantField, IWorkspaceCreateRequest, IWorkspacePublicKeysUpdateRequest, IWorkspaceUpdateRequest } from '../types'
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

	it('should validate & update workspace public keys correctly', async() => {
		for(const appl of PASS_WORKSPACE_PUBLIC_KEYS_UPDATES) {
			await request(app)
				.post('/validate/workspace-public-keys-update')
				.send(appl)
				.expect(200)
				.then(
					({ body }: { body: Response<'validateWorkspacePublicKeysUpdate'> }) => {
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
	{
		title: chance.sentence(),
		summary: chance.paragraph(),
		details: chance.paragraph(),
		reward: {
			committed: '100.4',
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
]

const makeGrantField = (): IGrantField => ({
	title: chance.sentence(),
	inputType: chance.pickone(['short-form', 'long-form'])
})

const PASS_GRANTS: IGrantCreateRequest[] = [
	{
		title: chance.sentence(),
		summary: chance.paragraph(),
		details: chance.paragraph(),
		reward: {
			committed: '100',
			asset: '0xA0A2BC123456643222323232323292'
		},
		creatorId: chance.guid(),
		workspaceId: chance.guid(),
		fields: {
			applicantName: makeGrantField(),
			applicantEmail: makeGrantField(),
			projectName: makeGrantField(),
			projectDetails: makeGrantField(),
			fundingBreakdown: makeGrantField(),
			[chance.guid()]: makeGrantField()
		}
	},
	{
		title: chance.sentence(),
		summary: chance.paragraph(),
		details: chance.paragraph(),
		reward: {
			committed: '1123421223',
			asset: '0xA0A2BC12345664322232323232323'
		},
		creatorId: chance.guid(),
		workspaceId: chance.guid(),
		fields: {
			applicantName: makeGrantField(),
			applicantEmail: makeGrantField(),
			projectName: makeGrantField(),
			projectDetails: makeGrantField(),
			fundingBreakdown: makeGrantField()
		}
	},
]

const PASS_WORKSPACES: IWorkspaceCreateRequest[] = [
	{
		title: chance.sentence(),
		about: chance.paragraph(),
		logoIpfsHash: chance.guid(),
		coverImageIpfsHash: chance.guid(),
		creatorId: chance.guid(),
		supportedNetworks: ['1'],
		socials: [
			{ name: 'twitter', value: chance.url() },
			{ name: 'discord', value: chance.url() }
		],
		publicKeys: [...Array(4)].map(
			() => ({
				publicKey: chance.guid(),
				address: chance.guid(),
			})
		)
	},
]

const PASS_GRANT_APPLICATIONS: IGrantApplicationRequest[] = [
	{
		grantId: chance.guid(),
		applicantId: chance.guid(),
		fields: {
			applicantName: [...Array(1)].map(
				() => ({
					value: chance.name(),
				})
			),
			applicantEmail: [...Array(3)].map(
				() => ({
					address: chance.guid(),
					value: chance.email(),
				})
			),
			projectName: [...Array(1)].map(
				() => ({
					value: chance.name(),
				})
			),
			projectDetails: [...Array(1)].map(
				() => ({
					value: chance.paragraph(),
				})
			),
			fundingBreakdown: [...Array(1)].map(
				() => ({
					value: chance.paragraph(),
				})
			),
			...[...Array(4)].reduce(
				(dict, _, i) => ({
					...dict,
					[i.toString()]: [...Array(1)].map(
						() => ({
							value: chance.sentence(),
						})
					),
				}), { }
			)
		},
		milestones: [...Array(5)].map(
			() => ({
				title: chance.sentence(),
				amount: chance.integer({ min: 1, max: 100 }).toString()
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

const PASS_WORKSPACE_PUBLIC_KEYS_UPDATES: IWorkspacePublicKeysUpdateRequest[] = [
	{
		publicKeys: [...Array(4)].map(
			() => ({
				publicKey: chance.guid(),
				address: chance.guid(),
			})
		)
	},
]