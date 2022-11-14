import { JwtPayload } from 'jsonwebtoken'
import { IResolvers } from 'mercurius'
import { getTokenPayload } from '../../utils/auth/jwt'

export const authQuery: IResolvers = {
  Query: {
    getUserData: async (_parent, _args, { authorization, prisma }) => {
      const jwtPayload = (await getTokenPayload(
        authorization,
        'access'
      )) as JwtPayload
      console.log('jwtPayload', jwtPayload)
      const userData = await prisma.user.findFirst(jwtPayload.id)
      return userData
    },
  },
}
