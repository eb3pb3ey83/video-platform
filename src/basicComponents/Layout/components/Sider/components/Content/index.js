import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  isCollapsed: PropTypes.bool,
  className: PropTypes.string,
}

function Content(props) {
  const { isCollapsed, className, ...restProps } = props

  return <div className={cx('layout-sider-content', className)} data-is-collapsed={isCollapsed} {...restProps} />
}

Content.propTypes = propTypes

export default Content
