import { Query, Resolver } from '@nestjs/graphql'
import { JwtAuthData } from 'src/auth/auth.types'
import { JwtAuth } from 'src/auth/guards/jwt.guard'
import { PrismaService } from 'src/prisma/prisma.service'
import { AuthUser } from 'src/utils/decorators/user.decorator'
import { selectUserOpts } from 'src/utils/prisma/selects'
import { User } from '../types/user.type'

@Resolver(() => User)
export class UserResolver {
  constructor(private prisma: PrismaService) {}
  @Query(() => User)
  @JwtAuth()
  async getUserData(@AuthUser() authData: JwtAuthData) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: authData.id,
      },
      select: selectUserOpts,
    })
    return user
  }
}
