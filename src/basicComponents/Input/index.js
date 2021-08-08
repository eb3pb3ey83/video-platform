// Libs
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import styles from './style.module.scss'

// Components

// Variables / Functions
const cx = classnames.bind(styles)

// PropTypes
export const propTypes = {
  className: PropTypes.string,
}

// DefaultProps
export const defaultProps = {}

function Input(props) {
  const { className, ...restProps } = props

  return <input className={cx('input', className)} type='text' {...restProps} />
}

Input.propTypes = propTypes
Input.defaultProps = defaultProps

export default Input
