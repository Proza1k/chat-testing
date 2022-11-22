import { MessageTypes } from 'src/types/message'
import { UserTypes } from 'src/types/user'
import { Container } from 'src/components/common/Container'
import cx from 'classnames'
import css from './ContentMessages.module.scss'
import { Input } from 'src/components/common/Input'
import { FormEventHandler, useCallback, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ContentMessageInput } from './types'
import { Form } from '../common/Form'
import { Message } from './Message'
import { useAppSelector } from 'src/store/hooks'
import { socket } from 'src/services/socket'

export type ContentMessagesProps = {
  messages: Nullable<MessageTypes[]>
  friend: UserTypes
}

export const ContentMessages = ({ friend, messages }: ContentMessagesProps) => {
  const { register, handleSubmit, reset } = useForm<ContentMessageInput>()
  const { payload: user } = useAppSelector(state => state.user)

  const onSubmitHandler = handleSubmit(
    useCallback<SubmitHandler<ContentMessageInput>>((data: ContentMessageInput) => {
      try {
        if (user) {
          const message: MessageTypes = {
            from: user,
            to: friend,
            content: data.message
          }
          socket.emit('message_to_server', message)
          reset()
        }
      } catch (error) {
        console.error(error)
      }
    }, [socket])
  ) as FormEventHandler<HTMLFormElement>

  return (
    <Container className={cx(css.contentMessages)}>
      <Container className={cx(css.contentMessagesContainer)}>
        {messages && messages.map((message, index) => <Message key={`message-component-${index}`} message={message} />)}
      </Container>
      <Form className={cx(css.contentMessagesInputContainer)} onSubmit={onSubmitHandler}>
        <Input register={register} required label={'message'} placeholder="Начните вводить текст" />
      </Form>
    </Container>
  )
}
