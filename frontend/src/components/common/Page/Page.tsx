import { ReactNode } from 'react'
import cx from 'classnames'
import css from './Page.module.scss'

export type PageProps = {
  children?: ReactNode
  className?: string
}

export const Page = ({ className, children }: PageProps) => <div className={cx(css.page, className)}>{children}</div>
