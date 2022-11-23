import { HttpException, UnauthorizedException } from '@nestjs/common'
import {
  Args,
  Context,
  GqlExecutionContext,
  Mutation,
  Resolver,
} from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma/prisma.service'
import { User } from '../user/types/user.type'
import {
  cookieOpts,
  jwtConstants,
  LoginMutationInput,
  refreshTokenCookieName,
  ReturnAccessToken,
  ReturnUserWithAccessToken,
} from './auth.types'

@Resolver(() => User)
export class AuthResolver {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  @Mutation(() => ReturnUserWithAccessToken)
  async login(
    @Args('data') data: LoginMutationInput,
    @Context() ctx: GqlExecutionContext
  ): Promise<ReturnUserWithAccessToken> {
    const user = await this.prisma.user.findUnique({
      where: {
        login: data.login,
      },
    })
    if (!user) throw new HttpException('Пользователь не найден', 400)
    if (user.password !== data.password)
      throw new HttpException('Пароль неверный', 400)
    const tokens = await this.generateTokens({
      id: user.id,
      login: user.login,
    })
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ctx.res.cookie(refreshTokenCookieName, tokens.refreshToken, cookieOpts)
    return {
      user: {
        email: user.email,
        id: user.id,
        login: user.login,
      },
      accessToken: tokens.accessToken,
    }
  }

  @Mutation(() => ReturnAccessToken)
  async refresh(
    refreshToken: string,
    @Context() ctx: GqlExecutionContext
  ): Promise<ReturnAccessToken> {
    if (!refreshToken) throw new UnauthorizedException()
    const jwtPayload = (await this.jwtService.verifyAsync(refreshToken, {
      secret: jwtConstants.refreshToken,
    })) as User

    if (!jwtPayload) throw new UnauthorizedException()

    const userFromDB = await this.prisma.user.findUnique({
      where: {
        id: jwtPayload.id,
      },
    })
    if (!userFromDB) throw new UnauthorizedException()

    const newTokens = await this.generateTokens({
      id: userFromDB.id,
      login: userFromDB.login,
    })
    console.log('    ctx.getContext().cookie :>> ', ctx.getContext().cookie)
    // ctx.res.cookie(refreshTokenCookieName, newTokens.refreshToken, cookieOpts)
    return { accessToken: newTokens.accessToken }
  }

  private async generateTokens(user: Pick<User, 'id' | 'login'>) {
    const jwtPayload = JSON.parse(JSON.stringify(user))
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        expiresIn: '30d',
        secret: jwtConstants.accessToken,
      }),
      this.jwtService.signAsync(jwtPayload, {
        expiresIn: '30d',
        secret: jwtConstants.refreshToken,
      }),
    ])

    return { accessToken, refreshToken }
  }
}
