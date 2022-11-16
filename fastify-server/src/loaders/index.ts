import { MercuriusLoaders } from 'mercurius'

export const loaders: MercuriusLoaders = {
  Chat: {
    async userCreated(queries, { prisma }) {
      console.log('queries.params :>> ', queries[0].params)
      try {
        const userIds = queries.map(({ obj }) => obj.userCreatedId)
        const users = await prisma.user.findMany({
          where: {
            id: {
              in: userIds,
            },
          },
        })
        return userIds.map(userId => users.find(user => user.id === userId))
      } catch (error) {
        console.log('error :>> ', error)
      }
    },
  },
  Message: {
    async chat(queries, { prisma }) {
      console.log('queries.params :>> ', queries[0].params)
      const chatIds = queries.map(({ obj }) => obj.chatId)
      const chats = await prisma.user.findMany({
        where: {
          id: {
            in: chatIds,
          },
        },
      })
      return chatIds.map(chatId => chats.find(chat => chat.id === chatId))
    },
    sender: {
      opts: {
        cache: false,
      },

      async loader(queries, { prisma }) {
        console.log('queries.params :>> ', queries[0].params)
        const senderIds = queries.map(({ obj }) => obj.senderId)
        console.log('senderIds :>> ', senderIds)
        const senders = await prisma.user.findMany({
          where: {
            id: {
              in: senderIds,
            },
          },
        })
        console.log('senders :>> ', senders)
        const users = senderIds.map(senderId =>
          senders.filter(sender => sender.id === senderId)
        )
        console.log('users :>> ', users)
        return users
      },
    },
  },
  //   ChatInfo: {
  //     async messages() {},
  //   },
}
