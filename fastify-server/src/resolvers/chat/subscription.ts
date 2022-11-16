import { IResolvers } from 'mercurius'
import { TOPICS } from '../../types/subscriptions'
import { checkAuth } from '../../utils/auth/jwt'

export const chatSubscription: IResolvers = {
  Subscription: {
    messageAdded: {
      subscribe: async (_, __, { pubsub, authorization }) => {
        const jwtPayload = checkAuth(authorization)
        return await pubsub.subscribe(
          `${TOPICS.MESSAGE_SENDED_TOPIC}-userId=${jwtPayload.id}`
        )
      },
    },
  },
}
