import { Icons } from 'src/types/icon'
import { ICONS } from './utils'

export type IconProps = {
  name: Icons
  className?: string
  onClick?: () => void
}

export const Icon = ({ name, className, onClick }: IconProps) => (
  <img src={ICONS[name]} onClick={onClick} className={className} alt={name} />
)
