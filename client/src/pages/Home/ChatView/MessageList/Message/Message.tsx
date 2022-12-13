import { Box, Heading, Text } from "@chakra-ui/react"
import React, { FC } from "react"
import { GetMessagesByChatQuery } from "../../../../../../generated/graphql"

interface Props {
  message: GetMessagesByChatQuery["getMessages"][number]
}

const Message: FC<Props> = ({ message }) => {
  return (
    <Box className="p-2">
      <Box className="d-flex gap-1">
        <Heading size="sm">{message.sender.login}</Heading>
      </Box>
      <Text className="max-w-[500px]">{message.message}</Text>
    </Box>
  )
}

export default Message
