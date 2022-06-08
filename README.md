# QuestBook Grant Validator Service

Service to validate grant application data &amp; push to IPFS

## Getting Started

1. Clone the repository
2. Install dependencies by running `yarn` (install yarn using npm if you do not have it `npm i -g yarn`)
3. Run tests to verify everything is working using `yarn test`

## Stack

1. Node v14 -- programming environment
2. Typescript 4+ -- programming language
3. ESLint -- linter
4. OpenAPI Backend -- server generation from OpenAPI
5. Serverless -- server deployment
6. GitHub Actions -- continous deployments on push to main branch

## Project Structure

We're using Node.js + typescript to build this service & is run on a serverless environment using the `serverless` framework.

1. We are following a design driven architecture for the service, this means we layout all the routes, request bodies, query parameters etc. in an OpenAPI doc before we begin writing the code.
	- All types are auto generated to avoid duplication & stale types
	- If you update any types, call `yarn generate:types` to refresh the typescript types
	- If you add/remove/update another route, call `yarn generate:routes-index` to regenerate the routes index file, that contains a map of all the routes the server has & is required for the server to function
2. The types from the OpenAPI document are then automatically generated using `openapi-typescript`
3. The server itself is written using an abstraction layer provided by `openapi-backend` that reads the OpenAPI spec & automatically generates the request validators etc. for us
	- All routes must be contained in the `./src/routes` folder and be named exactly as their operation ID as specified in the OpenAPI doc
4. The uploads to IPFS along with pinning are done via Web3.Storage (see `./src/utils/ipfs.ts`)

## Linting

1. Please lint files before pushing your code, the commands to lint are as follows:
	- `yarn lint` (just checks the files)
	- `yarn lint:fix` (checks & auto-fixes files)

**Notes on Env File:**
- Each environment (development, test & production) should have its own separate env file. They should be named like: `.env.[environemnt]`. Eg. `.env.test`
- for development, you could copy the `.env.test` file and name it `.env.development`