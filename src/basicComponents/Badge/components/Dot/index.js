import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  size: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.any,
}

export const defaultProps = {
  size: 5,
}

function Dot(props) {
  const { size, style, className, children, ...restProps } = props

  return (
    <sup className={cx('badge-dot', className)} style={{ ...style, width: size, height: size }} role='badge-content' {...restProps}>
      {children}
    </sup>
  )
}

Dot.propTypes = propTypes
Dot.defaultProps = defaultProps

export default Dot
