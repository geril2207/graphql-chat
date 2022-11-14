import merge from 'lodash.merge'
import { authMutation } from './mutation'
import { authQuery } from './query'

export const authResolver = merge({}, authMutation, authQuery)
