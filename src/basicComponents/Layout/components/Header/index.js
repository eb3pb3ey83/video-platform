import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  isFlexbox: PropTypes.bool,
  align: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around']),
  style: PropTypes.object,
  className: PropTypes.string,
}

function Header(props) {
  const { isFlexbox, align, style, className, ...restProps } = props

  return (
    <header className={cx('layout-header', className)} style={{ display: isFlexbox && 'flex', justifyContent: align, ...style }} {...restProps} />
  )
}
Header.propTypes = propTypes

export default Header
