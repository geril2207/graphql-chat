import { FC } from 'react'
import Login from '../pages/Login/Login'
import Redirect from '../components/Redirect/Redirect'
import Home from '../pages/Home/Home'

interface Route {
  id: string
  path: string
  element: FC
}

export const publicRoutes: Route[] = [
  { id: 'LOGIN', path: '/login', element: Login },
  { id: 'REDIRECT', path: '*', element: Redirect },
]

export const privateRoutes: Route[] = [{ id: 'HOME', path: '/home', element: Home }]
