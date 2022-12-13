import { Field, InputType, Int, ObjectType } from '@nestjs/graphql'
import { Chat } from 'src/chat/chat.types'
import { SortEnum } from 'src/common/common.types'
import { User } from 'src/user/types/user.type'



export const messageAddedSub = 'messageAddedSub'

@ObjectType()
export class Message {
  @Field(() => Int)
  id: number

  @Field(() => Int)
  senderId: number

  @Field(() => User)
  sender: User

  @Field(() => Int)
  chatId: number

  @Field(() => Chat)
  chat: Chat

  @Field()
  message: string

  @Field()
  createdAt: string
}

@InputType()
export class SendMessageInput {
  @Field()
  message: string

  @Field(() => Int)
  chatId: number
}

@InputType()
export class GetMessagesSort {
  @Field(() => SortEnum, {
    defaultValue: SortEnum.asc,
  })
  orderBy: 'asc' | 'desc'

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  skip: number

  @Field(() => Int, { nullable: true, defaultValue: 20 })
  take: number
}
