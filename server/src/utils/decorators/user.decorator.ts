import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export const AuthUser = createParamDecorator(
  async (_data: unknown, ctx: ExecutionContext) => {
    const gqlCtx = GqlExecutionContext.create(ctx).getContext()
    if (!gqlCtx.auth) throw new UnauthorizedException()
    return gqlCtx.auth
  }
)
