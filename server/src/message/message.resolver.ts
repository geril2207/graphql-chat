import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { JwtAuthData } from 'src/auth/auth.types'
import { DataLoaders } from 'src/loader/dataloader.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { User } from 'src/user/types/user.type'
import { AuthUser } from 'src/utils/decorators/user.decorator'
import { GetMessagesSort, Message, SendMessageInput } from './message.types'

@Resolver(() => Message)
export class MessageResolver {
  constructor(private prisma: PrismaService, private pubsub: PubSub) {
    console.log('this.pubsub :>> ', this.pubsub)
  }

  @Query(() => Message)
  async getMessage(@Args('id') id: number) {
    return await this.prisma.message.findUnique({ where: { id } })
  }

  @Query(() => [Message])
  async getMessages(
    @Args('chatId') chatId: number,
    @Args('sort', { nullable: true }) sort: GetMessagesSort
  ) {
    console.log('sort :>> ', sort)
    console.log('chatId :>> ', chatId)
    return await this.prisma.message.findMany({
      where: {
        chatId,
      },
      skip: sort.skip,
      take: sort.take,
      orderBy: {
        id: sort.orderBy,
      },
    })
  }

  @Mutation(() => Message)
  async sendMessage(
    @Args('data') data: SendMessageInput,
    @AuthUser() authData: JwtAuthData
  ) {
    const message = await this.prisma.message.create({
      data: {
        message: data.message,
        chatId: data.chatId,
        senderId: authData.id,
      },
    })
    return message
  }

  @ResolveField(() => User)
  async sender(
    @Parent() message: Message,
    @Context('loaders') dataloaders: DataLoaders
  ) {
    return await dataloaders.getMessageSenders.load(message.senderId)
  }
}
