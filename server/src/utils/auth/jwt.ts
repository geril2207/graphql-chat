import { User } from '@prisma/client'
import { sign, verify } from 'jsonwebtoken'
import mercurius from 'mercurius'
const { ErrorWithProps } = mercurius

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
    expiresIn: '15m',
  })

  const refreshToken = sign(userData, REFRESH_PRIVATE_KEY, {
    expiresIn: '30d',
  })
  return { accessToken, refreshToken }
}

export const getTokenPayload = async (
  token: string,
  type: 'access' | 'refresh'
) => {
  try {
    const secretTypeKey =
      type === 'access' ? ACCESS_PRIVATE_KEY : REFRESH_PRIVATE_KEY
    const parsedToken = parseBearerToken(token)
    const payload = verify(parsedToken, secretTypeKey)
    return payload
  } catch (error) {
    throw new ErrorWithProps('Пользователь не авторизован', {}, 403)
  }
}
