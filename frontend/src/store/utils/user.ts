import { createAuthCookie } from 'src/helpers/auth'
import { AuthToken } from 'src/types/auth'

export const createUserSession = (data: AuthToken): void => {
  const { access_token } = data
  if (access_token) {
    createAuthCookie(access_token)
  }
}
