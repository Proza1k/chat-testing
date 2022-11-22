import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit'
import { setError, setLoading, setSuccess } from 'src/helpers/redux'
import { Status } from 'src/types/status'
import { UserTypes } from 'src/types/user'
import { AUTH_USER, LOGIN_USER } from 'src/store/actions/user'

export type UserState = {
  status: Status
  payload: Nullable<UserTypes>
}

const initialState: UserState = {
  payload: null,
  status: Status.LOADING
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<UserState>) => {
    builder.addCase(LOGIN_USER.fulfilled, (state, action) => {
      const { payload } = action
      const { payload: responseData } = payload

      setSuccess(state, {
        payload: {
          payload: responseData?.user
        },
        type: 'userSlice/LOGIN_USER'
      })
    })
    builder.addCase(LOGIN_USER.rejected, setError)
    builder.addCase(LOGIN_USER.pending, setLoading)
    builder.addCase(AUTH_USER.fulfilled, setSuccess)
    builder.addCase(AUTH_USER.rejected, setError)
    builder.addCase(AUTH_USER.pending, setLoading)
  }
})
