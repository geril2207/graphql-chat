import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { selectUserOpts } from 'src/utils/prisma/selects'

@Injectable()
export class UserLoader {
  constructor(private prisma: PrismaService) {}

  async getChatUsersHandler(allChatIds: number[]) {
    const allUsers = await this.prisma.user.findMany({
      where: {
        chats: {
          some: {
            chatId: { in: allChatIds },
          },
        },
      },
      include: {
        chats: true,
      },
    })
    const result = allChatIds.map(chatId =>
      allUsers.filter(user => user.chats.find(chat => chat.chatId === chatId))
    )
    return result
  }

  async getMessageSendersOld(allMessagesIds: number[]) {
    console.log('allMessagesIds :>> ', allMessagesIds)
    const allSenders = await this.prisma.user.findMany({
      where: {
        sendedMessages: {
          some: {
            id: {
              in: allMessagesIds,
            },
          },
        },
      },
      select: {
        ...selectUserOpts,
        sendedMessages: {
          select: {
            id: true,
          },
        },
      },
    })
    console.log('allSenders :>> ', allSenders[0].sendedMessages)
    const result = allMessagesIds.map(messageId =>
      allSenders.find(sender =>
        sender.sendedMessages.find(
          senderMessageId => senderMessageId.id === messageId
        )
      )
    )
    console.log('result :>> ', result)
  }

  async getMessageSenders(allSendersId: number[]) {
    const allSenders = await this.prisma.user.findMany({
      where: {
        id: {
          in: allSendersId,
        },
      },
      select: {
        ...selectUserOpts,
        sendedMessages: {
          select: {
            id: true,
          },
        },
      },
    })
    const result = allSendersId.map(senderId =>
      allSenders.find(sender => sender.id === senderId)
    )

    return result
  }
}
