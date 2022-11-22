import { ReactNode } from 'react'
import { Size } from '../types/size'
import cx from 'classnames'
import css from './Text.module.scss'

export type TextProps = {
  children?: ReactNode
  className?: string
  size?: 'small' | 'medium' | 'large'
}

export const Text = ({ children, className, size = Size.small }: TextProps) => (
  <span
    className={cx(
      css.text,
      {
        [css.textSmall]: size === Size.small,
        [css.textMedium]: size === Size.medium,
        [css.textLarge]: size === Size.large
      },
      className
    )}
  >
    {children}
  </span>
)
