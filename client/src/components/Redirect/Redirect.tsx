import React from 'react'
import { Navigate } from 'react-router-dom'
import { getAccessToken } from '../../helpers/LocalStorage/AccessToken'

const Redirect = () => {
  const accessToken = getAccessToken()
  let to = accessToken ? '/home' : 'login'
  return <Navigate to={to} />
}

export default Redirect
