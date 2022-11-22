import { AuthPage } from 'src/router/Auth'
import { Home } from 'src/router/Home'
import { Route, Routes } from 'src/types/routes'

export const useRoutes = (): Route[] => [
  {
    path: Routes.HOME,
    element: <Home />,
    title: 'HOME',
    isRouteEnabled: true
  },
  {
    path: Routes.AUTH,
    element: <AuthPage />,
    title: 'Auth',
    isRouteEnabled: true
  },
  {
    path: Routes.MESSAGE,
    element: <Home />,
    title: 'Message',
    isRouteEnabled: true
  }
]
