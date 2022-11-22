import cx from 'classnames'
import css from './Switcher.module.scss'

export type SwitcherProps = {
  name: string
  checked: boolean
  change: (value: boolean) => void
}

export const Switcher = ({ name, checked, change }: SwitcherProps) => {
  const onChangeHandler = () => change(!checked)

  return (
    <div className={cx(css.switch)}>
      <input
        type="checkbox"
        className={cx(css.switchCheckbox)}
        name={name}
        id={name}
        checked={checked}
        onChange={onChangeHandler}
      />
      <label className={cx(css.switchLabel)} htmlFor={name}>
        <span className={cx(css.switchInner)} />
        <span className={cx(css.switchCommutator)} />
      </label>
    </div>
  )
}
