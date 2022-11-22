import { KeyboardEvent } from 'react'
import { Container } from '../common/Container'
import Avatar from 'react-nice-avatar'

import cx from 'classnames'
import css from './Menu.module.scss'
import { Text } from '../common/Text'
import { UserTypes } from 'src/types/user'
import { useMenu } from './hooks'
import { withLoading } from 'src/hooks/withLoading'
import { Input } from '../common/Input'
import { Form } from '../common/Form'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormEventHandler, useCallback, useEffect, useState } from 'react'
import { SearchFormInputs } from './types'
import { FriendsContainer } from './Friends'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import { socket } from 'src/services/socket'
import { GET_FRIENDS } from 'src/store/actions/friends'
import { Status } from 'src/types/status'

export type MenuProps = {
  user: UserTypes | null
}

const Menu = ({ user }: MenuProps) => {
  const dispatch = useAppDispatch()
  const { payload: friendsPayload } = useAppSelector(state => state.friends)
  const [currentFriends, setCurrentFriends] = useState<Nullable<UserTypes[]>>(friendsPayload)

  const { register, handleSubmit, reset } = useForm<SearchFormInputs>()

  const onSubmitHandler = handleSubmit(
    useCallback<SubmitHandler<SearchFormInputs>>(
      (data: SearchFormInputs) => {
        try {
          if (friendsPayload) {
            const searchFriends = friendsPayload.filter(friend => friend.login.includes(data.search))
            setCurrentFriends(searchFriends)
          }
        } catch (error) {
          console.error(error)
        }
      },
      [currentFriends, setCurrentFriends]
    )
  ) as FormEventHandler<HTMLFormElement>

  const onEscapeDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setCurrentFriends(friendsPayload)
        reset()
      }
    },
    [friendsPayload]
  )

  useEffect(() => {
    setCurrentFriends(friendsPayload)
    socket.on('friends_to_client', () => {
      dispatch(GET_FRIENDS())
    })
  }, [friendsPayload])

  return (
    <>
      {user && (
        <>
          <Container className={cx(css.menuHeader)}>
            <Avatar className={cx(css.menuAvatar)} {...user.avatar} />
            <Text size="medium">@{user.login}</Text>
          </Container>
          <Form className={cx(css.menuSearchForm)} onSubmit={onSubmitHandler}>
            <Input onKeyDown={onEscapeDown} placeholder="Поиск людей" label="search" register={register} />
          </Form>
          {currentFriends && <FriendsContainer friends={currentFriends} />}
        </>
      )}
    </>
  )
}

export const MenuContainer = () => {
  const userStore = useAppSelector(state => state.user)
  const [currentUser, setCurrentUser] = useState<Nullable<UserTypes>>(null)
  const [isLoading, setIsLoading] = useState<boolean>(userStore.status === Status.LOADING)

  useEffect(() => {
    if (userStore.status === Status.SUCCESS && userStore.payload) {
      setCurrentUser(userStore.payload)
    }

    setIsLoading(userStore.status === Status.LOADING)
  }, [userStore.status, userStore.payload])

  const Component = withLoading(Menu)({ user: currentUser, isLoading })

  return (
    <Container
      className={cx(css.menu, {
        [css.menuLoading]: isLoading
      })}
    >
      {Component}
    </Container>
  )
}
