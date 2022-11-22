import { UserTypes } from './user'

export type MessageTypes = {
  _id?: string
  content: string
  createdAt?: Date
  updatedAt?: Date
  from: UserTypes
  to: UserTypes
}
