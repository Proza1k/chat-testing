import cx from 'classnames'
import css from './Home.module.scss'
import { Page } from 'src/components/common/Page'
import { MenuContainer } from 'src/components/Menu'
import { TabWindowContainer } from 'src/components/TabWindow/TabWindow'
import { socket } from 'src/services/socket'
import { setMessages } from 'src/store/actions/message'
import { useAppDispatch } from 'src/store/hooks'
import { useEffect } from 'react'

export const Home = () => {
  const dispatch = useAppDispatch()

  socket.on('connect', () => {
    console.log('socket connected')
  })

  useEffect(() => {
    socket.on('message_to_client', ({ payload }) => {
      dispatch(setMessages(payload))
    })
  })

  return (
    <Page className={cx(css.home)}>
      <MenuContainer />
      <TabWindowContainer />
    </Page>
  )
}
