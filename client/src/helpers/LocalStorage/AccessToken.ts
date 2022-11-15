import { accessTokenVar } from '../../apollo'

const ACCESS_TOKEN_NAME = 'GQL_ACC_TOKEN'

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_NAME)
export const setAccessToken = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN_NAME, token)
  accessTokenVar(token)
}

export const removeAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_NAME)
  accessTokenVar(null)
}
