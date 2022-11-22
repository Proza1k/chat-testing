import { Container } from 'src/components/common/Container'
import { UserTypes } from 'src/types/user'
import cx from 'classnames'
import css from './Friends.module.scss'
import { FriendCard } from './FriendCard'

export type FriendsContainer = {
  friends: UserTypes[]
}

export const FriendsContainer = ({ friends }: FriendsContainer) => (
  <Container className={cx(css.friendsContainer)}>
    {friends && friends.map((friend, index) => <FriendCard key={`message-component-${index}`} friend={friend} />)}
  </Container>
)
