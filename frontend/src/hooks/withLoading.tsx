import { ComponentType } from 'react'
import { Spinner } from 'src/components/common/Spinner'

export type WithLoadingProps<T> = T & {
  isLoading: boolean
}

export const withLoading = <T extends Record<string, unknown>>(Component: ComponentType<T>) => (
  props?: WithLoadingProps<T>
) => {
  if (props?.isLoading) {
    return <Spinner />
  }

  return <Component {...(props as T)} />
}
