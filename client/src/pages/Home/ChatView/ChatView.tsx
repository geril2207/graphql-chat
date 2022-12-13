import { Box } from "@chakra-ui/react"
import React from "react"
import { useSelectedChat } from "../../../store/useSelectedChat"
import MessageInput from "./MessageInput/MessageInput"
import MessageList from "./MessageList/MessageList"

const ChatView = () => {
  const { selectedChatId } = useSelectedChat()
  return (
    <Box className="flex-grow px-4 h-100  flex flex-col justify-end">
      <Box className="max-h-[720px] overflow-y-auto">
        <MessageList selectedChatId={selectedChatId} />
      </Box>
      {selectedChatId && <MessageInput selectedChatId={selectedChatId} />}
    </Box>
  )
}

export default ChatView
