import { chatMutation } from './mutation'
import { chatSubscription } from './subscription'

export const chatResolver = Object.assign({}, chatMutation, chatSubscription)
