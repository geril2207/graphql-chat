import merge from 'lodash.merge'
import { Void } from '../scalars/void'
import { authResolver } from './auth'
import { chatResolver } from './chat'

export const resolvers = merge(
  {
    Void: Void,
  },
  authResolver,
  chatResolver
)

console.log('resolvers', resolvers)
