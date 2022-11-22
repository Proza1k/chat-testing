import { useParams } from 'react-router-dom'
import { Container } from '../common/Container'
import { EmptyPlug } from './EmptyPlug'

import cx from 'classnames'
import css from './TabWindow.module.scss'
import { useEffect, useState } from 'react'
import { UserTypes } from 'src/types/user'
import { useAppSelector } from 'src/store/hooks'
import { MessagesFriendTab } from './MessagesFriendTab'
import { MessageTypes } from 'src/types/message'

const TabWindow = () => {
  const params = useParams()
  const { payload: friends } = useAppSelector(state => state.friends)
  const { payload: messages } = useAppSelector(state => state.messages)
  const [friend, setFriend] = useState<Nullable<UserTypes>>(null)
  const [messagesFriend, setMessagesFriend] = useState<Nullable<MessageTypes[]>>(null)

  useEffect(() => {
    if (params.id && friends && messages) {
      const user = friends.find(friend => friend._id === params.id)
      const messagesByFriend = messages.filter(
        message => message.from._id === params.id || message.to._id === params.id
      )

      setFriend(user ?? null)
      setMessagesFriend(messagesByFriend ?? null)
    }
  }, [params.id, friends, messages])

  if (params.id && friend && messagesFriend) {
    return <MessagesFriendTab friend={friend} messages={messagesFriend} />
  }

  return <EmptyPlug />
}

export const TabWindowContainer = () => {
  return (
    <Container className={cx(css.tabWindow)}>
      <TabWindow />
    </Container>
  )
}
