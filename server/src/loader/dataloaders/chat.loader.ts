import { Injectable } from '@nestjs/common'
import { GetMessagesSort } from 'src/message/message.types'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class ChatLoader {
  constructor(private prisma: PrismaService) {}

  async getMessageChats(allMessageIds: number[], sort: GetMessagesSort) {
    const allChats = await this.prisma.chat.findMany({
      where: {
        chatMessages: {
          some: {
            id: {
              in: allMessageIds,
            },
          },
        },
      },
      skip: sort.skip,
      take: sort.take,
      orderBy: {
        id: sort.orderBy,
      },
    })

    return allMessageIds.map(messageId =>
      allChats.find(chat => chat.id === messageId)
    )
  }
}
