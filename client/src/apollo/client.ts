import { ApolloClient, HttpLink, split } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { cache } from './cache'
import { accessTokenVar } from './vars/accessToken'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'
import generateAuthHeader from '../utils/auth/generateHeader'

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:4000',
    connectionParams: {
      authorization: generateAuthHeader(accessTokenVar()),
    },
  })
)

const authLink = setContext((_, { headers }) => {
  const token = generateAuthHeader(accessTokenVar())
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  }
})

const httpLink = new HttpLink({
  uri: 'http://localhost:4000',
  // credentials: 'include',
})

export const client = new ApolloClient({
  link: httpLink,
  cache,
})

const errorLink = onError(({ graphQLErrors, networkError, forward, operation }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(async (error) => {
      console.log('error :>> ', error)
      console.log(
        `[GraphQL error]: Message: ${error.message}, Location: ${error.locations}, Path: ${error.path}`
      )
      // if (!error.path.includes('refresh')) {
      //   const res = await client.mutate({
      //     mutation: RefreshAuthDocument,
      //   })
      //   const accesToken = res.data?.refresh ?? null
      //   setAccessToken(res.data?.refresh ?? null)
      //   console.log('res :>> ', res)
      //   operation.setContext({
      //     headers: {
      //       authorization: accesToken,
      //     },
      //   })
      //   return forward(operation)
      // }
    })
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  httpLink
)

client.setLink(errorLink.concat(authLink.concat(splitLink)))
export { accessTokenVar }
