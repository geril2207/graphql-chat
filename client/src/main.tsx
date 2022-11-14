import React from 'react'
import { ApolloClient, ApolloProvider, gql, InMemoryCache } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ChakraProvider>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </ChakraProvider>
)
