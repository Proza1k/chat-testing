import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit'
import { setError, setLoading, setSuccess } from 'src/helpers/redux'
import { Status } from 'src/types/status'
import { UserTypes } from 'src/types/user'
import { GET_FRIENDS } from '../actions/friends'

export type FriendsState = {
  status: Status
  payload: Nullable<Array<UserTypes>>
}

const initialState: FriendsState = {
  payload: null,
  status: Status.LOADING
}

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<FriendsState>) => {
    builder.addCase(GET_FRIENDS.fulfilled, setSuccess)
    builder.addCase(GET_FRIENDS.rejected, setError)
    builder.addCase(GET_FRIENDS.pending, setLoading)
  }
})
