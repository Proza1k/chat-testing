import { asyncThunk } from 'src/helpers/redux'
import { RequestMethod } from 'src/helpers/request'
import { MessageTypes } from 'src/types/message'
import { UserTypes } from 'src/types/user'
import API_ROUTER from '../api-router'
import { messagesSlice } from '../reducers'

export const GET_MESSAGES = asyncThunk<UserTypes, MessageTypes[], null>({
  thunk: 'userSlice/GET_MESSAGES',
  route: API_ROUTER.getMessages,
  method: RequestMethod.GET
})

export const SEND_MESSAGE = asyncThunk<MessageTypes, MessageTypes[], null>({
  thunk: 'userSlice/SEND_MESSAGE',
  route: API_ROUTER.sendMessage,
  method: RequestMethod.POST
})

export const { setMessages } = messagesSlice.actions
