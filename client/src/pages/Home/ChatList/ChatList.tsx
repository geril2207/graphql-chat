import { Avatar, Box, Heading, Input } from '@chakra-ui/react'
import React from 'react'
import ChatListItem from './ChatListItem/ChatListItem'

const ChatList = () => {
  return (
    <Box className="w-2/6 border-r px-4">
      <Input placeholder="Поиск" />
      <Box>
        {Array.from({ length: 10 }, () => 0).map(() => (
          <ChatListItem />
        ))}
      </Box>
    </Box>
  )
}

export default ChatList
