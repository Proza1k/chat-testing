import { asyncThunk } from 'src/helpers/redux'
import { RequestMethod } from 'src/helpers/request'
import { UserTypes } from 'src/types/user'
import API_ROUTER from '../api-router'

export const GET_FRIENDS = asyncThunk<null, Nullable<UserTypes[]>, null>({
  thunk: 'userSlice/GET_FRIENDS',
  route: API_ROUTER.getFriends,
  method: RequestMethod.GET
})
