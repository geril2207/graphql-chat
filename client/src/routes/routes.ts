import { FC } from 'react'
import Login from '../pages/Login/Login'
import Home from '../pages/Home/Home'
import MainLayout from '../components/Layout/MainLayout/MainLayout'

export interface Route {
  id: string
  path: string
  element: FC<any>
  layout?: FC<any>
}

export const publicRoutes: Route[] = [{ id: 'LOGIN', path: '/login', element: Login }]

export const privateRoutes: Route[] = [
  { id: 'HOME', path: '/home', element: Home, layout: MainLayout },
]

