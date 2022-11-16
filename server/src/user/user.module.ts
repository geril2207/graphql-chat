import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthResolver } from './resolvers/auth.resolver'

@Module({
  imports: [PassportModule],
  providers: [AuthResolver, JwtService],
})
export class UserModule {}
