import { HttpException, UnauthorizedException } from '@nestjs/common'
import {
  Args,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma/prisma.service'
import {
  jwtConstants,
  LoginMutationInput,
  ReturnUserWithAccessToken,
} from '../types/auth.types'
import { User } from '../types/user.type'

@ObjectType()
export class Hello {
  @Field()
  hello: string
}

@Resolver(() => User)
export class AuthResolver {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  @Query(() => Hello)
  async getHello() {
    return { hello: '123' }
  }

  @Mutation(() => ReturnUserWithAccessToken)
  async login(
    @Args('data') data: LoginMutationInput
  ): Promise<ReturnUserWithAccessToken> {
    const user = await this.prisma.user.findUnique({
      where: {
        login: data.login,
      },
    })
    if (!user) throw new HttpException('Пользователь не найден', 400)
    if (user.password !== data.password)
      throw new HttpException('Пароль неверный', 400)
    const tokens = await this.generateTokens({ id: user.id, login: user.login })
    return { user, accessToken: tokens.accessToken }
  }

  async refresh(refreshToken: string) {
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
    return newTokens
  }

  private async generateTokens(user: Pick<User, 'id' | 'login'>) {
    const jwtPayload = JSON.parse(JSON.stringify(user))
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        expiresIn: '15m',
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
