import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { Request, Response } from 'express'
import { GraphQLError, GraphQLFormattedError } from 'graphql'
import { verify } from 'jsonwebtoken'
import { join } from 'path'
import { AuthModule } from './auth/auth.module'
import { jwtConstants, JwtAuthData } from './auth/auth.types'
import { ChatModule } from './chat/chat.module'
import { DataLoaderModule } from './loader/dataloader.module'
import { DataLoaders, DataLoaderService } from './loader/dataloader.service'
import { MessageModule } from './message/message.module'
import { PrismaModule } from './prisma/prisma.module'
import { PrismaService } from './prisma/prisma.service'
import { PubSubModule } from './pubsub/pubsub.module'
import { UserModule } from './user/user.module'

interface Context {
  req: Request
  res: Response
  loaders: DataLoaders
  auth?: JwtAuthData
}

@Module({
  imports: [
    PrismaModule,
    DataLoaderModule,
    PubSubModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [DataLoaderModule],
      inject: [DataLoaderService],
      useFactory: (dataloaderService: DataLoaderService) => ({
        path: '/',
        autoSchemaFile: join(process.cwd(), 'schema.gql'),
        sortSchema: true,
        context: ({ req, res, connectionParams }): Context => {
          const defaultCtx = {
            req,
            res,
            loaders: dataloaderService.getLoaders(),
          }

          // console.log('req :>> ', req)
          const authorization =
            req?.headers?.authorization ??
            connectionParams?.authorization ??
            null
          if (!authorization) return defaultCtx
          try {
            const token = authorization.split(' ')[1]
            const auth = verify(token, jwtConstants.accessToken) as JwtAuthData
            return { ...defaultCtx, auth }
          } catch (error) {
            return defaultCtx
          }
        },
        formatError: (error: GraphQLError) => {
          const graphQLFormattedError: GraphQLFormattedError = {
            message:
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              error.extensions?.exception?.response?.message || error.message,
          }
          return graphQLFormattedError
        },
        subscriptions: {
          'graphql-ws': {
            onConnect: context => {
              const { connectionParams } = context
              console.log('connectionParams :>> ', connectionParams)
              const authorization = connectionParams.authorization
              return { authorization }
            },
          },
        },
      }),
    }),
    AuthModule,
    UserModule,
    ChatModule,
    MessageModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
