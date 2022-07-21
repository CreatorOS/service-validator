import dotenv from 'dotenv'
dotenv.config({ path: '.env.test' })

import { randomBytes } from 'crypto'
import { getWeb3Client, uploadToIPFS } from '../utils/ipfs'

jest.setTimeout(30_000)

describe('IPFS Upload Tests', () => {
	it('should upload a file to IPFS', async() => {
		const client = getWeb3Client()

		const json = { id: randomBytes(8).toString('hex') }
		const { hash } = await uploadToIPFS(JSON.stringify(json), 'myFile.json')
		expect(hash).toBeTruthy()

		const res = await client.get(hash)
		expect(res?.ok).toBeTruthy()

		const files = await res?.files()
		if(files) {
			const file = files[0]
			expect(file?.cid).toBe(hash)
		}
	})
})