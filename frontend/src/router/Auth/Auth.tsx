import { Page } from 'src/components/common/Page'
import css from './Auth.module.scss'
import cx from 'classnames'
import Avatar, { AvatarFullConfig, genConfig } from 'react-nice-avatar'
import { useForm, SubmitHandler } from 'react-hook-form'
import { FormEventHandler, useCallback, useEffect, useState } from 'react'
import { Switcher } from 'src/components/common/Switcher'
import { Container } from 'src/components/common/Container'
import { Text } from 'src/components/common/Text'
import { getSexBySwitcher } from './utils'
import { Input } from 'src/components/common/Input'
import { Button } from 'src/components/common/Button'
import { Form } from 'src/components/common/Form'
import { AuthFormInputs } from './types'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import { LOGIN_USER } from 'src/store/actions/user'
import { useNavigate } from 'react-router-dom'
import { Routes } from 'src/types/routes'
import { socket } from 'src/services/socket'

export const AuthPage = () => {
  const dispatch = useAppDispatch()
  const userStore = useAppSelector(state => state.user)
  const [switcherChecked, setSwitcherChecked] = useState<boolean>(false)
  const [config, setConfig] = useState<AvatarFullConfig>(genConfig({ sex: getSexBySwitcher(switcherChecked) }))
  const { handleSubmit, reset, formState, register } = useForm<AuthFormInputs>()
  const history = useNavigate()

  const onSubmitHandler = handleSubmit(
    useCallback<SubmitHandler<AuthFormInputs>>(
      (data: AuthFormInputs) => {
        try {
          const responseData = {
            avatar: config,
            ...data
          }
          dispatch(LOGIN_USER(responseData))
          socket.emit('friends_to_server')
          history(Routes.HOME)
          reset()
        } catch (error) {
          console.error(error)
        }
      },
      [reset, config]
    )
  ) as FormEventHandler<HTMLFormElement>

  useEffect(() => {
    if (config.sex !== getSexBySwitcher(switcherChecked)) {
      const newConfig: AvatarFullConfig = genConfig({ sex: getSexBySwitcher(switcherChecked) })

      setConfig(newConfig)
    }
  }, [switcherChecked, userStore.payload, config])

  return (
    <Page className={cx(css.authPage)}>
      <Form onSubmit={onSubmitHandler}>
        <Container className={css.authContainerSwitcher}>
          <Text size="large">Male</Text>
          <Container className={css.authContainerSwitcherAvatar}>
            <Avatar className={cx(css.authAvatar)} {...config} />
            <Switcher name="Sex" checked={switcherChecked} change={useCallback(setSwitcherChecked, [])} />
          </Container>
          <Text size="large">Female</Text>
        </Container>
        <Input
          className={cx(css.authInput)}
          placeholder="Введите никнейм"
          pattern={RegExp(/^[a-z]+([-_]?[a-z0-9]+){0,2}$/i)}
          register={register}
          label="login"
          required
          error={formState.errors.login}
        />
        <Button className={cx(css.authLoginButton)} size="small">
          Login
        </Button>
      </Form>
    </Page>
  )
}
