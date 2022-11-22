import { FormEvent, ReactNode } from 'react'

export type FormProps = {
  className?: string
  children: ReactNode
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export const Form = ({ children, className, onSubmit }: FormProps) => (
  <form className={className} onSubmit={onSubmit} role="form">
    {children}
  </form>
)
