import { Container } from 'src/components/common/Container'
import { useAppSelector } from 'src/store/hooks'
import Avatar from 'react-nice-avatar'
import { MessageTypes } from 'src/types/message'
import cx from 'classnames'
import css from './Message.module.scss'
import { Text } from 'src/components/common/Text'

export type MessageProps = {
  message: MessageTypes
}

export const Message = ({ message }: MessageProps) => {
  const { payload: user } = useAppSelector(state => state.user)

  const getTimeMessage = (date: Date) => {
    const hours = date.getHours() > 10 ? date.getHours() : `0${date.getHours()}`
    const minutes = date.getMinutes() > 10 ? date.getMinutes() : `0${date.getMinutes()}`
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()

    return `${hours}:${minutes} ${day}/${month}/${year}`
  }

  return (
    <>
      {user && (
        <Container
          className={cx(css.messageContainer, {
            [css.messageContainerRight]: message.from._id === user._id,
            [css.messageContainerLeft]: message.from._id !== user._id
          })}
        >
          <Container className={cx(css.message)}>
            {message.from._id !== user._id && (
              <Container className={cx(css.messageAvatarContainer)}>
                <Avatar className={cx(css.messageAvatar)} {...message.from.avatar} />
              </Container>
            )}
            <Container className={cx(css.messageContentContainer)}>
              <Container className={cx(css.messageContentTop)}>
                <Text>{message.from._id === user._id ? 'Me' : `@${message.from.login}`}</Text>
                <Text size="small">{getTimeMessage(new Date(message.createdAt!))}</Text>
              </Container>
              <Container
                className={cx(css.messageContent, {
                  [css.messageContentRight]: message.from._id === user._id,
                  [css.messageContentLeft]: message.from._id !== user._id
                })}
              >
                {message.content}
              </Container>
            </Container>
          </Container>
        </Container>
      )}
    </>
  )
}
