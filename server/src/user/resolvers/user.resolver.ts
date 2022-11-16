import { Query } from '@nestjs/common'
import { Resolver } from '@nestjs/graphql'
import { User } from '../types/user.type'

@Resolver(() => User)
export class UserResolver {
  @Query(() => User)
  async getUserData() {}
}
