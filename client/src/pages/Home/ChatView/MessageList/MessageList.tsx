import { Box } from '@chakra-ui/react'
import React, { FC } from 'react'
import { useGetMessagesByChatQuery, useGetUserDataQuery } from '../../../../../generated/graphql'
import { useSelectedChat } from '../../../../store/useSelectedChat'
import Message from './Message/Message'

interface Props {
  selectedChatId: number | null
}

const MessageList: FC<Props> = ({ selectedChatId }) => {
  const { data: user } = useGetUserDataQuery()
  const { data: messages } = useGetMessagesByChatQuery({
    variables: {
      chatId: selectedChatId ?? -1,
    },
    skip: !selectedChatId,
  })
  console.log('data', messages)

  return (
    <Box>
      {!selectedChatId && 'Выберите чат из списка'}
      {messages?.getMessages &&
        messages.getMessages.map((message) => <Message message={message} key={message.id} />)}
    </Box>
  )
}

export default MessageList
