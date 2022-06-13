import { Boom } from '@hapi/boom'
import { File, Web3Storage } from 'web3.storage'
import logger from './logger'

const token = (() => {
	const { WEB3_STORAGE_API_TOKEN } = process.env
	if(WEB3_STORAGE_API_TOKEN) {
		return WEB3_STORAGE_API_TOKEN.toString()
	}

	logger.info('A token is needed. You can create one on https://web3.storage')
	return ''
})()

export const getWeb3Client = () => {
	const storage = new Web3Storage({ token })
	return storage
}

export const uploadToIPFS = async(
	data: string | Buffer,
	filename: string
): Promise<{ hash: string }> => {
	try {
		const storage = getWeb3Client()
		const files: File[] = []
		const filedata: (string | Buffer)[] = []
		filedata.push(data)
		const file = new File(filedata, filename)
		files.push(file)
		const result = await storage.put(files, { wrapWithDirectory: false })
		return { hash: result }

	} catch(error) {
		// add a descriptive message
		throw new Boom('IPFS upload failed', { data: error })
	}
}

export const getUrlForIPFSHash = (hash: string) => (
	`https://dweb.link/ipfs/${hash}`
)