import { ObjectType, Field, InputType } from '@nestjs/graphql'
import { User } from './user.type'

export const jwtConstants = {
  accessToken: 'acc',
  refreshToken: 'refresh',
}

@ObjectType()
export class ReturnUserWithAccessToken {
  @Field(() => User)
  user: User

  @Field()
  accessToken: string
}

@InputType()
export class LoginMutationInput {
  @Field()
  login: string

  @Field()
  password: string
}
