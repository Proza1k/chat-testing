import { Status } from './status'

export type ResponseServiceData<T> = {
  payload?: T
  message?: string
  status?: Status
}
