import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  className: PropTypes.string,
}

function Header(props) {
  const { className, ...restProps } = props

  return <div className={cx('panel-header', className)} {...restProps} />
}

Header.propTypes = propTypes

export default Header
