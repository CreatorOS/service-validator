import { getUrlForIPFSHash, uploadToIPFS } from './ipfs'
import { Handler, Operation } from './make-api'

async function makeUploaderFunction<T extends Operation>(operation: T) {
	const handler: Handler<T> = async(req) => {
		const createdAt = new Date()
		// add additional metadata to the application
		const fullData = { ...req, createdAt }
		// stringify the grant & push to IPFS
		const { hash } = await uploadToIPFS(
			JSON.stringify(fullData), 
			{ contentType: 'application/json', filename: `qb-${operation}-${createdAt.getTime()}.json` }
		)

		return {
			ipfsHash: hash,
			url: getUrlForIPFSHash(hash)
		}
	}

	return handler
}

export default makeUploaderFunction