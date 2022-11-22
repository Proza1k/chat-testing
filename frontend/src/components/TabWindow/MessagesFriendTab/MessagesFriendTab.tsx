import { Container } from 'src/components/common/Container'
import { UserTypes } from 'src/types/user'
import cx from 'classnames'
import css from './MessagesFriendTab.module.scss'
import { HeaderUser } from 'src/components/HeaderUser'
import { MessageTypes } from 'src/types/message'
import { ContentMessages } from 'src/components/ContentMessages'

export type MessagesFriendTabProps = {
  friend: UserTypes
  messages: Nullable<MessageTypes[]>
}

export const MessagesFriendTab = ({ friend, messages }: MessagesFriendTabProps) => {

  return (
    <Container className={cx(css.messagesFriendTab)}>
      <HeaderUser user={friend} />
      <ContentMessages friend={friend} messages={messages} />
    </Container>
  )
}
