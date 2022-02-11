
// this file serves to post-process the generated client 
// the post processing is required to resolve any TS issues that the generator cropped up

const { readFile, writeFile } = require('fs/promises')
const path = require('path')

/** specify the location of the package using an env flag */
const PACKAGE_LOCATION = process.env.PACKAGE_LOCATION;

(async() => {
	const file = path.join(PACKAGE_LOCATION, 'api.ts')
	
	let apiTsContents = await readFile(file, 'utf-8')
	// generator did not type up additionalProperties correctly
	apiTsContents = apiTsContents.replace('[key: string]: Array | any', '[key: string]: Array<string>')

	await writeFile(file, apiTsContents)
})()