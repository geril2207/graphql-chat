import { Box, Button, Input } from '@chakra-ui/react'
import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useSendMessageMutation } from '../../../../../generated/graphql'

interface Form {
  message: string
}

interface Props {
  selectedChatId: number
}
const MessageInput: FC<Props> = ({ selectedChatId }) => {
  const { register, handleSubmit } = useForm<Form>()
  const [sendMessage, { loading }] = useSendMessageMutation()

  return (
    <form
      className="flex gap-2"
      onSubmit={handleSubmit((data) =>
        sendMessage({
          variables: {
            data: {
              chatId: selectedChatId,
              message: data.message,
            },
          },
        })
      )}
    >
      <Input placeholder="Введите сообщение" {...register('message')} />
      <Button disabled={loading}>Отправить</Button>
    </form>
  )
}

export default MessageInput
