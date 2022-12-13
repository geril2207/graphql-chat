import { gql } from "@apollo/client"
import { Button, Input } from "@chakra-ui/react"
import React, { FC } from "react"
import { useForm } from "react-hook-form"
import { useSendMessageMutation } from "../../../../../generated/graphql"

interface Form {
  message: string
}

interface Props {
  selectedChatId: number
}
const MessageInput: FC<Props> = ({ selectedChatId }) => {
  const { register, handleSubmit, resetField } = useForm<Form>()
  const [sendMessageMutation, { loading }] = useSendMessageMutation({
    update(cache, { data }) {
      cache.modify({
        fields: {
          getMessages(messages = []) {
            const newMessage = cache.writeFragment({
              data: data?.sendMessage,
              fragment: gql`
                fragment NewMessage on Message {
                  id
                  message
                }
              `,
            })
            return [...messages, newMessage]
          },
        },
      })
    },
  })

  const sendMessage = handleSubmit(data => {
    sendMessageMutation({
      variables: {
        data: {
          chatId: selectedChatId,
          message: data.message,
        },
      },
    })
    resetField("message")
  })

  return (
    <form className="flex gap-2" onSubmit={sendMessage}>
      <Input placeholder="Введите сообщение" {...register("message")} />
      <Button disabled={loading} type="submit">
        Отправить
      </Button>
    </form>
  )
}

export default MessageInput
