import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const defaultProps = {
  disabled: false,
}

export const propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
}

function Icon(props) {
  const { checked, disabled, ...restProps } = props

  return <span className={cx('radio-icon')} data-is-checked={checked} data-is-disabled={disabled} {...restProps} />
}

Icon.defaultProps = defaultProps
Icon.propTypes = propTypes

export default Icon
