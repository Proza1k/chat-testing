import { AvatarFullConfig } from 'react-nice-avatar'
import { UserTypes } from 'src/types/user'

export type AuthTypes = {
  login: string
  avatar: AvatarFullConfig
}

export type AuthToken = {
  access_token: string
  user: UserTypes
}
