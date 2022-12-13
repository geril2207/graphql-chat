import { Box, Input } from "@chakra-ui/react"
import React from "react"
import {
  useGetUserChatsQuery,
  useGetUserDataQuery,
} from "../../../../generated/graphql"
import { useSelectedChat } from "../../../store/useSelectedChat"
import ChatListItem from "./ChatListItem/ChatListItem"

const ChatList = () => {
  const { data: userData } = useGetUserDataQuery()
  const { data } = useGetUserChatsQuery()
  const { setSelectedChatId, selectedChatId } = useSelectedChat()
  return (
    <Box className="w-3/12 border-r px-4">
      <Input placeholder="Поиск" />
      <Box>
        {data &&
          data.getUserChats.map(item => (
            <ChatListItem
              selectedChatId={selectedChatId}
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
