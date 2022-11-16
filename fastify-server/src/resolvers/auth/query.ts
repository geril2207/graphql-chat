import { IResolvers } from 'mercurius'
import { checkAuth } from '../../utils/auth/jwt'

export const authQuery: IResolvers = {
  Query: {
    getUserData: async (_parent, _args, { authorization, prisma }) => {
      const jwtPayload = checkAuth(authorization)
      const userData = await prisma.user.findFirst({
        where: {
          id: jwtPayload.id,
        },
      })
      return userData
    },
  },
}
