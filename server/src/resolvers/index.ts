import merge from 'lodash.merge'
import { Void } from '../scalars/void'
import { authResolver } from './auth'

export const resolvers = merge(
  {
    Void: Void,
  },
  authResolver
)

console.log('resolvers', resolvers)
