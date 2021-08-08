import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  size: PropTypes.string,
}

export const defaultProps = {
  size: 'xs',
}

function Spinner(props) {
  const { size } = props
  return <div className={cx('spinner')} data-size={size} {...props} />
}

Spinner.propTypes = propTypes
Spinner.defaultProps = defaultProps

export default Spinner
