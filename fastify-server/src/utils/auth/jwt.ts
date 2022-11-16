import { User } from '@prisma/client'
import { JwtPayload, sign, verify } from 'jsonwebtoken'
import mercurius from 'mercurius'
const { ErrorWithProps } = mercurius

export interface AuthJwtPayload extends JwtPayload {
  id: number
  login: string
}

export const ACCESS_PRIVATE_KEY = 'access'
export const REFRESH_PRIVATE_KEY = 'refresh'

const parseBearerToken = (token: string) => {
  return token.replace('Bearer ', '')
}

export const generateTokens = (user: User) => {
  const userData: Pick<User, 'id' | 'login'> = {
    id: user.id,
    login: user.login,
  }
  const accessToken = sign(userData, ACCESS_PRIVATE_KEY, {
    expiresIn: '30d',
  })

  const refreshToken = sign(userData, REFRESH_PRIVATE_KEY, {
    expiresIn: '30d',
  })
  return { accessToken, refreshToken }
}

export const getTokenPayload = (token: string, type: 'access' | 'refresh') => {
  try {
    const secretTypeKey =
      type === 'access' ? ACCESS_PRIVATE_KEY : REFRESH_PRIVATE_KEY
    const parsedToken = parseBearerToken(token)
    const payload = verify(parsedToken, secretTypeKey) as AuthJwtPayload
    return payload
  } catch (error) {
    console.log('error :>> ', error)
    throw new ErrorWithProps(
      'Пользователь не авторизован',
      {
        hello: 'world',
      },
      403
    )
  }
}

export const checkAuth = (token: string) => getTokenPayload(token, 'access')
