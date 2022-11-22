import { useEffect, useState } from 'react'
import { useAppSelector } from 'src/store/hooks'
import { Status } from 'src/types/status'
import { UserTypes } from 'src/types/user'

export const useMenu = () => {
  const userStore = useAppSelector(state => state.user)
  const [currentUser, setCurrentUser] = useState<Nullable<UserTypes>>(null)

  useEffect(() => {
    if (userStore.status === Status.SUCCESS && userStore.payload) {
      setCurrentUser(userStore.payload)
    }
  }, [userStore.status])

  return {
    user: currentUser,
    isLoading: userStore.status === Status.LOADING
  }
}
