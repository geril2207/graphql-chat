import { Box } from "@chakra-ui/react"
import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react"
import {
  useGetMessagesByChatQuery,
  useGetUserDataQuery,
} from "../../../../../generated/graphql"
import { useSelectedChat } from "../../../../store/useSelectedChat"
import { useScrollToBot } from "./hooks/useScrollToBot"
import Message from "./Message/Message"

interface Props {
  selectedChatId: number | null
}

const MessageList: FC<Props> = ({ selectedChatId }) => {
  const { data: user } = useGetUserDataQuery()
  const lastMessageRef = useRef<HTMLDivElement>(null)
  const { data: messages } = useGetMessagesByChatQuery({
    variables: {
      chatId: selectedChatId ?? -1,
    },
    skip: !selectedChatId,
  })

  const reversedMessages = useMemo(() => {
    if (!messages?.getMessages) return undefined
    const reversedMesasges = [...messages.getMessages]
    return reversedMesasges.reverse()
  }, [messages?.getMessages])

  const scrollToBot = useCallback((arg?: ScrollIntoViewOptions) => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView(arg)
    }
  }, [])

  useScrollToBot({
    chatId: selectedChatId,
    messages: reversedMessages,
    scrollToBot,
  })

  return (
    <Box>
      {!selectedChatId && "Выберите чат из списка"}
      {reversedMessages &&
        reversedMessages.map(message => (
          <Message message={message} key={message.id} />
        ))}
      <div ref={lastMessageRef} />
    </Box>
  )
}

export default MessageList
