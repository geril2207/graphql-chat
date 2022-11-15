import { IResolvers } from 'mercurius'
import { TOPICS } from '../../types/subscriptions'
import { checkAuth } from '../../utils/auth/jwt'

export const chatMutation: IResolvers = {
  Mutation: {
    async sendMessage(_, { message }, { prisma, authorization, pubsub }) {
      let chatId: number | null | undefined = message.chatId
      const auth = checkAuth(authorization)
      if (message.receiverId && !message.chatId) {
        console.log('message.receiverId :>> ', message.receiverId)
        try {
          chatId = (
            await prisma.chat.create({
              data: {
                type: 'private',
                ChatParticipant: {
                  create: [
                    {
                      user: {
                        connect: { id: auth.id },
                      },
                    },
                    { user: { connect: { id: message.receiverId } } },
                  ],
                },
              },
              select: { id: true },
            })
          ).id
        } catch (error) {
          console.log('error :>> ', error)
        }
      }
      if (chatId) {
        const newMessage = await prisma.message.create({
          data: {
            message: message.message,
            chat: {
              connect: {
                id: chatId,
              },
            },
            sender: {
              connect: {
                id: auth.id,
              },
            },
          },
          select: {
            chat: true,
            chatId: true,
            createdAt: true,
            id: true,
            message: true,
            sender: true,
            senderId: true,
          },
        })
        pubsub.publish(
          {
            topic: TOPICS.MESSAGE_SENDED_TOPIC,
            payload: {
              messageAdded: newMessage,
            },
          },
          () => {
            console.log('HELLO WORLD')
          }
        )
        console.log('newMessage :>> ', newMessage)
        return newMessage
      }
    },
  },
}
