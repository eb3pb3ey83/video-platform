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

function Count(props) {
  const { className, children, ...restProps } = props

  return (
    <sup className={cx('badge-count', className)} role='badge-content' {...restProps}>
      {children}
    </sup>
  )
}

Count.propTypes = propTypes

export default Count
