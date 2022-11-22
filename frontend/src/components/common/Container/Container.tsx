import { ReactNode } from 'react'
import cx from 'classnames'

export type ContainerProps = {
  children?: ReactNode
  className?: string
  onClick?: () => void
}

export const Container = ({ children, className, onClick }: ContainerProps) => (
  <div className={cx(className)} onClick={onClick}>
    {children}
  </div>
)
