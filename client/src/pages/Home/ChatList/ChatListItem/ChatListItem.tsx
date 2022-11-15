import { Box, Avatar, Heading } from '@chakra-ui/react'
import React from 'react'

const ChatListItem = () => {
  return (
    <Box className="py-4 flex">
      <Avatar size={'md'} src={'https://avatars.dicebear.com/api/male/username.svg'} />
      <Heading className="ml-2" size={'sm'}>
        Ilya
      </Heading>
    </Box>
  )
}

export default ChatListItem
