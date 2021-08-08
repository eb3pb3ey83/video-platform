// Libs
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import styles from './style.module.scss'

// Components
import Icon from './components/Icon'

// Variables / Functions
const cx = classnames.bind(styles)

// PropTypes
export const propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool,
  group: PropTypes.string,
  disabled: PropTypes.bool,
}

// DefaultProps
export const defaultProps = {}

function RadioComponent(props) {
  const { className, label, checked, group, disabled, ...restProps } = props

  return (
    <>
      <label className={cx('radio', className)}>
        <input className={cx('radio-input')} type='radio' name={group} checked={checked} disabled={disabled} {...restProps} />
        <Icon checked={checked} disabled={disabled} />
        <span className={cx('radio-title')}>{label}</span>
      </label>
    </>
  )
}

RadioComponent.propTypes = propTypes
RadioComponent.defaultProps = defaultProps

export default RadioComponent
