import {
  Args,
  Context,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { JwtAuthData } from 'src/auth/auth.types'
import { DataLoaders } from 'src/loader/dataloader.service'
import { GetMessagesSort, Message } from 'src/message/message.types'
import { PrismaService } from 'src/prisma/prisma.service'
import { User } from 'src/user/types/user.type'
import { AuthUser } from 'src/utils/decorators/user.decorator'
import { Chat } from './chat.types'

@Resolver(() => Chat)
export class ChatResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [Chat])
  async getUserChats(
    @AuthUser()
    authData: JwtAuthData
  ) {
    const chats = await this.prisma.chat.findMany({
      where: {
        AND: [
          {
            chatParticipants: {
              some: {
                userId: authData.id,
              },
            },
          },
          {
            chatMessages: {
              some: {},
            },
          },
        ],
      },
    })
    return chats
  }

  @ResolveField(() => [User])
  async chatParticipants(
    @Parent() chat: Chat,
    @Args('withUser', { nullable: true, defaultValue: true }) withUser: boolean,
    @Context('loaders') dataLoaders: DataLoaders,
    @AuthUser() authData: JwtAuthData
  ) {
    const chatUsersLoader = dataLoaders.getChatUsersLoader
    const data = await chatUsersLoader.load(chat.id)
    if (withUser) return data
    return data.filter(item => item.id !== authData.id)
  }
  @ResolveField(() => [Message])
  async messages(
    @Args('sort', { nullable: true }) sort: GetMessagesSort,
    @Parent() chat: Chat,
    @Context('loaders') dataLoaders: DataLoaders
  ) {
    const chatMessages = await dataLoaders.getChatMessages.load({
      chatId: chat.id,
      sort,
    })
    return chatMessages
  }
}
