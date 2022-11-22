import { useEffect } from 'react'
import { GET_FRIENDS } from 'src/store/actions/friends'
import { GET_MESSAGES } from 'src/store/actions/message'
import { AUTH_USER } from 'src/store/actions/user'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import { Status } from 'src/types/status'

export const useAppStartHooks = () => {
  const dispatch = useAppDispatch()

  const userStore = useAppSelector(state => state.user)
  const friendsStore = useAppSelector(state => state.friends)
  const messagesStore = useAppSelector(state => state.messages)

  useEffect(() => {
    const isUser = Boolean(userStore.status === Status.SUCCESS && userStore.payload)
    
    if (!userStore.payload && userStore.status === Status.LOADING) {
      dispatch(AUTH_USER())
    }

    if (isUser && !friendsStore.payload) {
      dispatch(GET_FRIENDS())
    }

    if (isUser && !messagesStore.payload) {
      dispatch(GET_MESSAGES())
    }
  }, [dispatch, userStore.status, friendsStore.status, messagesStore.status])
}
