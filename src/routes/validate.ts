import { IFullGrant } from '../types'
import { getUrlForIPFSHash, uploadToIPFS } from '../utils/ipfs'
import { Handler } from '../utils/make-api'

const validate: Handler<'validate'> = async(
	application,
	{}
) => {
	const createdAt = new Date()
	// add additional metadata to the application
	const fullGrant: IFullGrant = { ...application, createdAt }
	// stringify the grant & push to IPFS
	const { hash } = await uploadToIPFS(
		JSON.stringify(fullGrant), 
		{ contentType: 'application/json', filename: `qb-grant-${createdAt.getTime()}.json` }
	)

	return {
		ipfsHash: hash,
		url: getUrlForIPFSHash(hash)
	}
}

export default validate