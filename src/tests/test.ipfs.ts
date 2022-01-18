import axios from 'axios'
import { randomBytes } from 'crypto'
import { getUrlForIPFSHash, uploadToIPFS } from '../utils/ipfs'

describe('IPFS Upload Tests', () => {
	it('should upload a file to IPFS', async() => {
		const json = { id: randomBytes(8).toString('hex') }
		
		const { hash } = await uploadToIPFS(JSON.stringify(json), { contentType: 'application/json' })
		expect(hash).toBeTruthy()

		const url = await getUrlForIPFSHash(hash)
		const data = await axios(url)
		expect(data.data).toEqual(json)
	})
})