import { ObjectType, Field, InputType } from '@nestjs/graphql'
import { JwtPayload } from 'jsonwebtoken'
import { User } from 'src/user/types/user.type'
export const refreshTokenCookieName = 'refreshToken'

export const cookieOpts = {
  httpOnly: true,
  maxAge: 1000 * 60 * 60 * 24 * 30,
}

export const jwtConstants = {
  accessToken: 'acc',
  refreshToken: 'refresh',
}

@ObjectType()
export class ReturnUserWithAccessToken {
  @Field(() => User)
  user: Omit<User, 'password'>

  @Field()
  accessToken: string
}

@ObjectType()
export class ReturnAccessToken {
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

export interface JwtAuthData extends JwtPayload {
  id: number
  login: string
}
