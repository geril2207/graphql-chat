import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthResolver } from './auth.resolver'

@Module({
  providers: [AuthResolver, JwtService],
})
export class AuthModule {}
