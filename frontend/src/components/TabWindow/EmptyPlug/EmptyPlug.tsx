import cx from 'classnames'
import { Container } from 'src/components/common/Container'
import { Icon } from 'src/components/common/Icon'
import { Icons } from 'src/types/icon'
import { Text } from 'src/components/common/Text'

import css from './EmptyPlug.module.scss'

export const EmptyPlug = () => (
  <Container className={cx(css.emptyPlug)}>
    <Text size="large">Выберите пользователя, чтобы начать диалог</Text>
    <Icon className={cx(css.emptyPlugImage)} name={Icons.emptyPlug} />
  </Container>
)
