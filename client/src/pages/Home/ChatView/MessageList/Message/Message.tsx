import { Box, Heading, Text } from '@chakra-ui/react'
import React, { FC } from 'react'
import { GetMessagesByChatQuery } from '../../../../../../generated/graphql'

interface Props {
  message: GetMessagesByChatQuery['getMessages'][number]
}

const Message: FC<Props> = ({ message }) => {
  return (
    <Box>
      <Heading size={'sm'}>{message.sender.login}</Heading>
      <Text>{message.message}</Text>
    </Box>
  )
}

export default Message
