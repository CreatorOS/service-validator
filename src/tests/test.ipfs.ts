import { randomBytes } from 'crypto'
import { Web3Storage } from 'web3.storage'
import { uploadToIPFS } from '../utils/ipfs'
import logger from '../utils/logger'

describe('IPFS Upload Tests', () => {
	it('should upload a file to IPFS', async() => {
		const token: string = (() => {
			const { WEB3_STORAGE_API_TOKEN } = process.env
			if(WEB3_STORAGE_API_TOKEN) {
				return WEB3_STORAGE_API_TOKEN.toString()
			}

			logger.info('A token is needed. You can create one on https://web3.storage')
			return ''
		})()

		const client = new Web3Storage({ token })
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