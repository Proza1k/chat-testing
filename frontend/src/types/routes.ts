export enum Routes {
  HOME = '/',
  AUTH = '/auth',
  MESSAGE = '/mail/:id'
}

export type Route = {
  path: string | Routes
  element: React.ReactElement
  isRouteEnabled: boolean
  title: string | React.ReactElement
  onClick?: () => void
}
