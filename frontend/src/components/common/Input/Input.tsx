import { KeyboardEvent, useState } from 'react'

import { FieldError, Path, UseFormRegister, ValidationRule } from 'react-hook-form'

import cx from 'classnames'
import css from './Input.module.scss'

export type InputProps = {
  className?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  type?: 'text' | 'password'
  name?: string
  id?: string
  disabled?: boolean
  onFocus?: () => void
  onKeyDown?: (event: KeyboardEvent) => void
  onKeyUp?: (event: KeyboardEvent<HTMLInputElement>) => void
  onKeyPress?: (event: KeyboardEvent<HTMLInputElement>) => void
  autoFocus?: boolean
  autoComplete?: 'on' | 'off'
  required?: boolean
  register: NonNullable<UseFormRegister<any>>
  label: NonNullable<Path<any>>
  pattern?: ValidationRule<RegExp>
  error?: FieldError
}

export const Input = ({
  className,
  placeholder,
  value,
  type = 'text',
  id,
  disabled,
  onFocus,
  onKeyDown,
  onKeyUp,
  onKeyPress,
  autoFocus,
  autoComplete,
  required,
  register,
  label,
  pattern
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = () => {
    setIsFocused(true)
    onFocus && onFocus()
  }

  return (
    <div className={cx(css.inputContainer, className, { [css.inputFocused]: isFocused })}>
      <input
        className={cx(css.input)}
        placeholder={placeholder}
        value={value}
        type={type}
        id={id}
        disabled={disabled}
        onFocus={handleFocus}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onKeyPress={onKeyPress}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        required={required}
        {...register(label, {
          required,
          pattern
        })}
      />
    </div>
  )
}
