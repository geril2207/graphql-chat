import { ApolloClient } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { cache } from './cache'
import { accessTokenVar } from './vars/accessToken'
import { createClient } from 'graphql-ws'

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:4000',
  })
)
export const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache,
})

export { accessTokenVar }
