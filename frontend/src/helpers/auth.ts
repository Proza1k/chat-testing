import Cookies from 'universal-cookie'

export const AUTH_TOKEN_NAME = 'chat_auth_token'
export const DOMAIN_COOKIE = ''

export const getAuthToken = (): string | null => {
  const cookies = new Cookies()

  return cookies.get(AUTH_TOKEN_NAME)
}

export const createAuthCookie = (token: string): void => {
  const cookies = new Cookies()

  cookies.set(AUTH_TOKEN_NAME, token, {
    domain: DOMAIN_COOKIE
  })
}
