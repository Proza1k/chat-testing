import { asyncThunk } from 'src/helpers/redux'
import { RequestMethod } from 'src/helpers/request'
import { AuthToken, AuthTypes } from 'src/types/auth'
import API_ROUTER from 'src/store/api-router'
import { createUserSession } from 'src/store/utils/user'

export const LOGIN_USER = asyncThunk<AuthTypes, AuthToken, void>({
  thunk: 'userSlice/LOGIN_USER',
  route: API_ROUTER.login,
  method: RequestMethod.POST,
  callback: data => data.payload && createUserSession(data.payload)
})

export const AUTH_USER = asyncThunk<null, AuthTypes, null>({
  thunk: 'userSlice/AUTH_USER',
  route: API_ROUTER.auth,
  method: RequestMethod.GET
})
