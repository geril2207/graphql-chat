import { Box, Input } from '@chakra-ui/react'
import React from 'react'
import { useGetUserChatsQuery, useGetUserDataQuery } from '../../../../generated/graphql'
import { useSelectedChat } from '../../../store/useSelectedChat'
// import { useMessageSendedSubscribeSubscription } from '../../../../generated/graphql'
import ChatListItem from './ChatListItem/ChatListItem'

const ChatList = () => {
  const { data: userData } = useGetUserDataQuery()
  const { data } = useGetUserChatsQuery()
  const { setSelectedChatId } = useSelectedChat()
  // useMessageSendedSubscribeSubscription()
  return (
    <Box className="w-2/6 border-r px-4">
      <Input placeholder="Поиск" />
      <Box>
        {data &&
          data.getUserChats.map((item) => (
            <ChatListItem
              userData={userData}
              item={item}
              key={item.id}
              setSelectedChatId={setSelectedChatId}
            />
          ))}
      </Box>
    </Box>
  )
}

export default ChatList
