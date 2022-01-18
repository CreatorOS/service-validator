import { components } from './gen'

export type IGrantApplication = components['schemas']['GrantApplication']
export type IFullGrant = IGrantApplication & { createdAt: Date | string }