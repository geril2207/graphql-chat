import { useReactiveVar } from '@apollo/client'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { accessTokenVar } from '../apollo'
import Redirect from '../components/Redirect/Redirect'
import { privateRoutes, publicRoutes, Route as IRoute } from './routes'

const formatLayoutElement = (route: IRoute) => {
  if (route.layout)
    return (
      <route.layout>
        <route.element />
      </route.layout>
    )

  return <route.element />
}

const Router = () => {
  const accessToken = useReactiveVar(accessTokenVar)
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route) => (
          <Route key={route.id} path={route.path} element={formatLayoutElement(route)} />
        ))}
        {accessToken &&
          privateRoutes.map((route) => (
            <Route key={route.id} path={route.path} element={formatLayoutElement(route)} />
          ))}
        <Route path="*" element={<Redirect />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
