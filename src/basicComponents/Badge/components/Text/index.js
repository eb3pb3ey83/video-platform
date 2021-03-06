import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
}

function Text(props) {
  const { className, children, ...restProps } = props

  return (
    <span className={cx('badge-text', className)} {...restProps}>
      {children}
    </span>
  )
}

Text.propTypes = propTypes

export default Text
