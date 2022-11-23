import { Injectable } from '@nestjs/common'
import { GetMessagesSort } from 'src/message/message.types'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class MessageLoader {
  constructor(private prisma: PrismaService) {}

  async getChatMessages(items: { chatId: number; sort: GetMessagesSort }[]) {
    const sort = items[0].sort
    const allChatIds = items.map(item => item.chatId)
    const allMessages = await this.prisma.message.findMany({
      where: {
        chatId: {
          in: allChatIds,
        },
      },
      skip: sort.skip,
      take: sort.take,
      orderBy: {
        id: sort.orderBy,
      },
    })

    return allChatIds.map(chatId =>
      allMessages.filter(message => message.chatId === chatId)
    )
  }
}
