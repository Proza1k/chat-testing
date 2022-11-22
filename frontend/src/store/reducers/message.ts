import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit'
import { setError, setLoading, setSuccess } from 'src/helpers/redux'
import { MessageTypes } from 'src/types/message'
import { Status } from 'src/types/status'
import { GET_MESSAGES, SEND_MESSAGE } from '../actions/message'

export type MessagesState = {
  status: Status
  payload: Nullable<Array<MessageTypes>>
}

const initialState: MessagesState = {
  status: Status.LOADING,
  payload: null
}

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.payload = action.payload
    }
  },
  extraReducers: (builder: ActionReducerMapBuilder<MessagesState>) => {
    builder.addCase(SEND_MESSAGE.fulfilled, setSuccess)
    builder.addCase(SEND_MESSAGE.rejected, setError)
    builder.addCase(SEND_MESSAGE.pending, setLoading)
    builder.addCase(GET_MESSAGES.fulfilled, setSuccess)
    builder.addCase(GET_MESSAGES.rejected, setError)
    builder.addCase(GET_MESSAGES.pending, setLoading)
  }
})
