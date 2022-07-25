import { randomBytes } from 'crypto'
import { getUrlForIPFSHash, uploadToIPFS } from './ipfs'
import { Handler, Operation } from './make-api'

const IS_TEST = process.env.NODE_ENV === 'test'

async function makeUploaderFunction<T extends Operation>(operation: T) {
	const handler: Handler<T> = async(req: any) => {
		const createdAt = new Date()
		// add additional metadata to the application
		const fullData = { ...req, createdAt }

		let hash: string
		if(IS_TEST) {
			hash = randomBytes(8).toString('hex')
		} else {
			// stringify the grant & push to IPFS
			const result = await uploadToIPFS(
				JSON.stringify(fullData), 
				`qb-${operation}-${createdAt.getTime()}.json`
			)
			hash = result.hash
		}

		return {
			ipfsHash: hash,
			url: getUrlForIPFSHash(hash)
		}
	}

	return handler
}

export default makeUploaderFunction