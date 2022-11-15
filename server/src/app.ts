import fastify from 'fastify'
import mercurius from 'mercurius'
import mercuriusCodegen, { loadSchemaFiles } from 'mercurius-codegen'
import compress from '@fastify/compress'
import { buildContext } from './utils/context'
import AltairFastify from 'altair-fastify-plugin'
import { resolvers } from './resolvers'
import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import { loaders } from './loaders'

const app = fastify()

const PORT = 4000

const { schema } = loadSchemaFiles('src/schema.graphql')

app.register(mercurius, {
  schema,
  resolvers,
  graphiql: false,
  context: buildContext,
  path: '/',
  subscription: true,
  cache: false,
  loaders,
})
app.register(AltairFastify, {
  path: '/altair',
  baseURL: '/altair/',
  endpointURL: '/',
})

app.register(fastifyCors, {
  origin: '*',
})
// app.register(compress)

app.register(fastifyCookie, {
  secret: 'chat-secret',
})

app.listen({ port: PORT }, err => {
  if (err) {
    console.log(err)
  }
  console.log(`Server has been started at http://localhost:${PORT}`)
  console.log(`Altair http://localhost:${PORT}/altair`)
})
mercuriusCodegen(app, {
  targetPath: './src/graphql/generated.ts',
}).catch(console.error)
