import { Box, Avatar, Heading, Text } from '@chakra-ui/react'
import React, { FC } from 'react'
import { ChatType, GetUserChatsQuery, GetUserDataQuery } from '../../../../../generated/graphql'

interface Props {
  item: GetUserChatsQuery['getUserChats'][number]
  userData?: GetUserDataQuery
  setSelectedChatId: (id: number) => void
}

const ChatListItem: FC<Props> = ({ item, userData, setSelectedChatId }) => {
  const title = item.type === ChatType.Group ? item.title : item.chatParticipants[0].login
  const lastSenderLogin =
    item.messages[0]?.sender?.login === userData?.getUserData.login
      ? 'Вы'
      : item.messages[0]?.sender.login

  const lastMessage = item.messages[0].message

  return (
    <Box
      onClick={() => setSelectedChatId(item.id)}
      className="py-4 pl-2 my-2 flex cursor-pointer border-2 transition-all border-transparent rounded-lg hover:border-blue-200"
    >
      <Avatar size={'md'} src={'https://avatars.dicebear.com/api/male/username.svg'} />
      <Box className="ml-2">
        <Heading size={'sm'}>{title}</Heading>
        <Text className="mt-1">
          {lastSenderLogin && (
            <>
              <span className="font-semibold">{lastSenderLogin}:</span> {lastMessage}
            </>
          )}
        </Text>
      </Box>
    </Box>
  )
}

export default ChatListItem
