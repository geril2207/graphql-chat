import { ChatType, Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const users: Prisma.UserCreateManyInput[] = [
  { email: 'ilya@mail.ru', login: 'ilya', password: '123' },
  { email: 'andrew@mail.ru', login: 'andrew', password: '123' },
  { email: 'egor@mail.ru', login: 'egor', password: '123' },
  { email: 'leha@mail.ru', login: 'leha', password: '123' },
]

const createPrivateChat = async (ids: number[]) => {
  await prisma.chat.create({
    data: {
      type: 'private',
      chatParticipants: {
        createMany: {
          data: ids.map(id => ({ userId: id })),
        },
      },
    },
  })
}

const createChats = async () => {
  const users = await prisma.user.findMany()
  await createPrivateChat([users[0].id, users[1].id])
  await createPrivateChat([users[0].id, users[2].id])
  await createPrivateChat([users[0].id, users[3].id])
  await createPrivateChat([users[1].id, users[2].id])
  await createPrivateChat([users[1].id])
}

const main = async () => {
  //   await prisma.user.createMany({
  //     data: users,
  //   })
  await createChats()
}

main()
