import { IResolvers } from 'mercurius'
import { TOPICS } from '../../types/subscriptions'

export const chatSubscription: IResolvers = {
  Subscription: {
    messageAdded: {
      subscribe: async (_, __, { pubsub }) => {
        return await pubsub.subscribe(TOPICS.MESSAGE_SENDED_TOPIC)
      },
    },
  },
}
