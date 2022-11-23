import { Global, Module } from '@nestjs/common'
import { PubSub } from 'graphql-subscriptions'

@Global()
@Module({
  providers: [{ provide: PubSub, useValue: new PubSub(), useExisting: PubSub }],
  exports: [PubSub],
})
export class PubSubModule {}
