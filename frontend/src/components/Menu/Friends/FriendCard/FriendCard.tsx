import { UserTypes } from 'src/types/user'
import cx from 'classnames'
import css from './FriendCard.module.scss'
import Avatar from 'react-nice-avatar'
import { Container } from 'src/components/common/Container'
import { useNavigate, useParams } from 'react-router-dom'

export type FriendCardProps = {
  friend: UserTypes
}

export const FriendCard = ({ friend }: FriendCardProps) => {
  const { id } = useParams()
  const history = useNavigate()

  const onClickHandle = () => {
    history(`/mail/${friend._id}`)
  }

  return (
    <Container
      className={cx(css.friendCard, {
        [css.friendCardActive]: id === friend._id
      })}
      onClick={onClickHandle}
    >
      <Container className={cx(css.friendCardAvatarContainer)}>
        <Avatar className={cx(css.friendCardAvatar)} {...friend.avatar} />
      </Container>
      <Container className={cx(css.friendCardContentContainer)}>{friend.login}</Container>
    </Container>
  )
}
