import cx from 'classnames'
import { Container } from 'src/components/common/Container'
import { Text } from 'src/components/common/Text'
import Avatar from 'react-nice-avatar'
import { UserTypes } from 'src/types/user'
import css from './HeaderUser.module.scss'

export type HeaderUserProps = {
  user: UserTypes
}

export const HeaderUser = ({ user }: HeaderUserProps) => (
  <Container className={cx(css.headerUser)}>
    <Container className={cx(css.headerUserAvatarContainer)}>
      <Avatar className={cx(css.headerUserAvatar)} {...user.avatar} />
    </Container>
    <Container className={cx(css.headerUserContentContainer)}>
      <Container className={cx(css.headerUserText)}>
        <Text size="medium">{user.login}</Text>
      </Container>
    </Container>
  </Container>
)
