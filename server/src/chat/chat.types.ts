import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql'
import { ChatType } from '@prisma/client'
import { Message } from 'src/message/message.types'
import { User } from 'src/user/types/user.type'

registerEnumType(ChatType, {
  name: 'ChatType',
})

@ObjectType()
export class Chat {
  @Field(() => Int)
  id: number

  @Field({ nullable: true })
  title?: string

  @Field(() => ChatType)
  type: ChatType

  @Field(() => User)
  userCreated: User

  @Field(() => [Message])
  messages: Message[]

  @Field(() => [User])
  chatParticipants: User[]
}
