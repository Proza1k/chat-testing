import { Routes, Route, useNavigate } from 'react-router-dom'
import { Routes as RoutesEnum } from 'src/types/routes'
import { getAuthToken } from 'src/helpers/auth'
import { useRoutes } from 'src/hooks/routes'
import { useEffect } from 'react'

export const Router = () => {
  const routes = useRoutes()
  const currentPath = window.location.pathname

  const isTokenUser = getAuthToken()
  const history = useNavigate()

  useEffect(() => {
    if (!isTokenUser) {
      history(RoutesEnum.AUTH)
    } else {
      history(currentPath)
    }
  }, [isTokenUser])

  return (
    <Routes>
      {routes.map(route => {
        return <Route key={route.path} path={route.path} element={route.element} />
      })}
    </Routes>
  )
}
