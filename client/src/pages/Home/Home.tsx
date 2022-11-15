import { Box } from '@chakra-ui/react'
import React from 'react'
import ChatList from './ChatList/ChatList'

const Home = () => {
  return (
    <Box className="flex">
      <ChatList />
      <Box className="flex-grow px-4">123</Box>
    </Box>
  )
}

export default Home
