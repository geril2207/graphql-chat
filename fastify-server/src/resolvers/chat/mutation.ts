import { IResolvers } from 'mercurius'
import { TOPICS } from '../../types/subscriptions'
import { checkAuth } from '../../utils/auth/jwt'

export const chatMutation: IResolvers = {
  Mutation: {
    async sendMessage(_, { message }, { prisma, authorization, pubsub }) {
      let chatId: number | undefined | null = message.chatId
      console.log('authorization :>> ', authorization)
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
          include: {
            chat: {
              include: {
                ChatParticipant: true,
              },
            },
          },
        })
        console.log('newMessage :>> ', newMessage)
        pubsub.publish({
          topic: TOPICS.MESSAGE_SENDED_TOPIC,
          payload: {
            messageAdded: newMessage,
          },
        })
        console.log('newMessage :>> ', newMessage)
        return newMessage
      }
    },
  },
}
