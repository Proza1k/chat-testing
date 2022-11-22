import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { friendsSlice, userSlice } from './reducers'
import { messagesSlice } from './reducers/message'

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    messages: messagesSlice.reducer,
    friends: friendsSlice.reducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
