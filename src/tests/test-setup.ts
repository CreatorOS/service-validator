require('../utils/env').default()

import { Application } from 'express'
import makeTestServer from './make-test-server'

export const describeWithApp = (
	name: string,
	tests: (
        app: Application
    ) => void,
) => describe(name, () => {
	const app = makeTestServer()

	tests(app)
})