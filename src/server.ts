import 'dotenv/config'
import './container'

import { resolve } from 'node:path'

import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { container } from 'tsyringe'
import { buildSchema } from 'type-graphql'

import { ErrorInterceptor as formatError } from './app/middlewares/error-interceptor'
import { NewRelicPlugin } from './app/plugins/new-relic-plugin'
import { AuthResolver } from './app/resolvers/auth-resolver'
import { CardResolver } from './app/resolvers/card-resolver'
import { CollectionResolver } from './app/resolvers/collection-resolver'
import { UserResolver } from './app/resolvers/user-resolver'
import { Context } from './app/types/context'

export const createApolloServer = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver, AuthResolver, CardResolver, CollectionResolver],
    emitSchemaFile: resolve(__dirname, './schema.gql'),
    container: { get: (cls) => container.resolve(cls) },
  })

  const server = new ApolloServer<Context>({
    schema,
    formatError,
    plugins: [new NewRelicPlugin()],
  })

  const port = process.env.APP_PORT ? +process.env.APP_PORT : 4000

  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
      return {
        token: req.headers.authorization,
        user: { id: '' },
      }
    },
    listen: {
      port,
    },
  })

  console.log(`🚀 Server ready on ${url} 🚀`)

  return { server, url }
}
