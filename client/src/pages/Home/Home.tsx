import { Box } from '@chakra-ui/react'
import React from 'react'
import { useGetUserDataQuery } from '../../../generated/graphql'
import ChatList from './ChatList/ChatList'
import ChatView from './ChatView/ChatView'

const Home = () => {
  const { data } = useGetUserDataQuery()
  const a = 1
  return (
    <Box className="flex flex-grow h-max">
      <ChatList />
      <ChatView />
    </Box>
  )
}

export default Home
