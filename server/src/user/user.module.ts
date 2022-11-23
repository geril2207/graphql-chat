import { Module } from '@nestjs/common'
import { UserResolver } from './resolvers/user.resolver'

@Module({
  providers: [UserResolver],
})
export class UserModule {}
