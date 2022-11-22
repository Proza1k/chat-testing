import cx from 'classnames'
import { Icons } from 'src/types/icon'
import { Icon } from '../Icon'
import css from './Button.module.scss'

export type ButtonProps = {
  className?: string
  onClick?: () => void
  children: React.ReactNode
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  iconPosition?: 'left' | 'right'
  icon?: Icons
  size?: 'small' | 'medium' | 'large'
}

export const Button = ({
  className,
  children,
  onClick,
  disabled,
  type,
  icon,
  iconPosition,
  size = 'medium',
  ...props
}: ButtonProps) => {
  const iconStyles = cx(css.buttonIcon, {
    [css.buttonIconLeft]: iconPosition === 'left',
    [css.buttonIconRight]: iconPosition === 'right',
    [css.buttonSizeSmall]: size === 'small',
    [css.buttonSizeMedium]: size === 'medium',
    [css.buttonSizeLarge]: size === 'large'
  })

  return (
    <button
      className={cx(className, css.button, {
        [css.buttonDisabled]: disabled,
        [css.buttonSizeSmall]: size === 'small',
        [css.buttonSizeMedium]: size === 'medium',
        [css.buttonSizeLarge]: size === 'large'
      })}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && <Icon className={iconStyles} name={icon} />}
      {children}
      {icon && iconPosition === 'right' && <Icon className={iconStyles} name={icon} />}
    </button>
  )
}
