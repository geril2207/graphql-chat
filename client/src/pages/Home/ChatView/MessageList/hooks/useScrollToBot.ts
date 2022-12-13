import { useLayoutEffect, useRef } from "react"
import { GetMessagesByChatQuery } from "../../../../../../generated/graphql"

interface Params {
  chatId: number | null
  messages?: GetMessagesByChatQuery["getMessages"]
  scrollToBot: (arg?: ScrollIntoViewOptions) => void
}
export const useScrollToBot = ({ chatId, messages, scrollToBot }: Params) => {
  useLayoutEffect(() => {
    scrollToBot()
  }, [messages, scrollToBot, chatId])
}
