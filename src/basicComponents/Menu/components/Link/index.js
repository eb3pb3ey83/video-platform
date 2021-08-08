import React from 'react'
import { NavLink } from 'react-router-dom'
import classnames from 'classnames/bind'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = NavLink.propTypes

function Link(props) {
  const { className, activeClassName, isBlank, children, style, ...restProps } = props

  return (
    <NavLink
      className={cx('menu-link', className)}
      activeClassName={cx('menu-link--active', activeClassName)}
      role='menu-link'
      style={style}
      {...restProps}
    >
      {children}
    </NavLink>
  )
}

Link.propTypes = propTypes

export default Link
