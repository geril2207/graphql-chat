import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { verify } from 'jsonwebtoken'
import { JwtAuthData, jwtConstants } from '../auth.types'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext()
    const authorization = ctx.req.headers.authorization
    const authPayload = this.validateToken(authorization)
    ctx.auth = authPayload
    return true
  }

  private validateToken(authorization?: string) {
    try {
      if (!authorization) throw new UnauthorizedException()
      const token = authorization.split(' ')[1]
      return verify(token, jwtConstants.accessToken) as JwtAuthData
    } catch (error) {
      throw new UnauthorizedException()
    }
  }
}

export const JwtAuth = () => UseGuards(JwtAuthGuard)
