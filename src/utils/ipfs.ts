import { Boom } from '@hapi/boom'
import axios from 'axios'
import FormData from 'form-data'
import logger from './logger'

const IPFS_UPLOAD_ENDPOINT = 'https://api.thegraph.com/ipfs/api/v0/add'

const IPFS_AUTH = (() => {
	const { INFURA_PROJECT_ID, INFURA_PROJECT_SECRET } = process.env
	if(INFURA_PROJECT_ID && INFURA_PROJECT_SECRET) {
		return { username: INFURA_PROJECT_ID, password: INFURA_PROJECT_SECRET }
	}

	logger.info('no credentials present for infura IPFS upload, uploaded documents will not be pinned')
})()

export const uploadToIPFS = async(
	data: string | Buffer,
	filename?: string
): Promise<{ hash: string }> => {
	const form = new FormData()
	const opts: FormData.AppendOptions = {
		filename,
		contentType: 'application/json'
	}
	form.append('file', data, opts)
	try {
		const result = await axios.post<{ Hash: string }>(
			IPFS_UPLOAD_ENDPOINT,
			form,
			{
				auth: IPFS_AUTH,
				responseType: 'json',
				headers: { 'Content-Type': `multipart/form-data; boundary=${form.getBoundary()}` }
			}
		)
		return { hash: result.data.Hash }
	} catch(error) {
		// add data to the error so it can be tracked later
		let errorData: any
		if(axios.isAxiosError(error)) {
			errorData = error.response?.data
			console.log(errorData)
		}
		
		// add a descriptive message
		throw new Boom('IPFS upload failed', { data: errorData })
	}
}

export const getUrlForIPFSHash = (hash: string) => (
	// https://docs.ipfs.io/concepts/what-is-ipfs
	// https://infura.io/docs/ipfs#section/Getting-Started/Pin-a-file
	`https://api.thegraph.com/ipfs/api/v0/cat?arg=${hash}`
)