import { makeVar } from '@apollo/client'
import { getAccessToken } from '../../helpers/LocalStorage/AccessToken'

export const accessTokenVar = makeVar(getAccessToken())
