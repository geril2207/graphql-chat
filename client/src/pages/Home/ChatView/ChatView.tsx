import { Box } from '@chakra-ui/react'
import React from 'react'
import { useSelectedChat } from '../../../store/useSelectedChat'
import MessageInput from './MessageInput/MessageInput'
import MessageList from './MessageList/MessageList'

const ChatView = () => {
  const { selectedChatId } = useSelectedChat()
  return (
    <Box className="flex-grow px-4 h-100 flex flex-col justify-between">
      <MessageList selectedChatId={selectedChatId} />
      {selectedChatId && <MessageInput selectedChatId={selectedChatId} />}
    </Box>
  )
}

export default ChatView
