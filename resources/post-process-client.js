
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
	apiTsContents = apiTsContents.replace('[key: string]: Array | any', '[key: string]: Array<GrantApplicationFieldAnswerItem>')
	// since the committed format is integer, the generator types it as a number
	// but we need it as a string because the committed number will be larger than a 64 bit unsigned integer
	apiTsContents = apiTsContents.replace("'committed': number", "'committed': string")
	apiTsContents = apiTsContents.replace("'amount': number", "'amount': string")
	// GrantApplicationFieldAnswers cannot be an interface, hence switch to using type
	apiTsContents = apiTsContents.replace(
		`export interface GrantApplicationFieldAnswers {
    [key: string]: Array<GrantApplicationFieldAnswerItem>;`,
		'export type GrantApplicationFieldAnswers = { [key: string]: Array<GrantApplicationFieldAnswerItem> } & {'
	)

	await writeFile(file, apiTsContents)
})()