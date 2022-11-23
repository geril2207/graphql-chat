import { Injectable } from '@nestjs/common'
import { Chat, User } from '@prisma/client'
import * as DataLoader from 'dataloader'
import { GetMessagesSort, Message } from 'src/message/message.types'
import { ChatLoader } from './dataloaders/chat.loader'
import { MessageLoader } from './dataloaders/message.loader'
import { UserLoader } from './dataloaders/user.loader'

export interface DataLoaders {
  getChatUsersLoader: DataLoader<number, User[], number>
  getMessageChats: DataLoader<number, Chat, number>
  getChatMessages: DataLoader<
    {
      chatId: number
      sort: GetMessagesSort
    },
    Message[]
  >
  getMessageSenders: DataLoader<number, User, number>
}

@Injectable()
export class DataLoaderService {
  constructor(
    private userLoader: UserLoader,
    private chatLoader: ChatLoader,
    private messageLoader: MessageLoader
  ) {}

  getLoaders(): DataLoaders {
    return {
      getChatUsersLoader: new DataLoader(
        this.userLoader.getChatUsersHandler.bind(this.userLoader)
      ),
      getMessageChats: new DataLoader(
        this.chatLoader.getMessageChats.bind(this.chatLoader)
      ),
      getChatMessages: new DataLoader(
        this.messageLoader.getChatMessages.bind(this.messageLoader)
      ),
      getMessageSenders: new DataLoader(
        this.userLoader.getMessageSenders.bind(this.messageLoader)
      ),
    }
  }
}
