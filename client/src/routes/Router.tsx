import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { getAccessToken } from '../helpers/LocalStorage/AccessToken'
import { privateRoutes, publicRoutes } from './routes'

const Router = () => {
  const accessToken = getAccessToken()
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route) => (
          <Route key={route.id} path={route.path} element={<route.element />} />
        ))}
        {accessToken &&
          privateRoutes.map((route) => (
            <Route key={route.id} path={route.path} element={<route.element />} />
          ))}
      </Routes>
    </BrowserRouter>
  )
}

export default Router
