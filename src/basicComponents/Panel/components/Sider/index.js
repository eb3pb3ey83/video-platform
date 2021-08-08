import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.object,
  className: PropTypes.string,
}

function Sider(props) {
  const { width, style, className, ...restProps } = props

  return <div className={cx('panel-sider', className)} style={{ width, ...style }} {...restProps} />
}

Sider.displayName = 'Layout.Sider'
Sider.propTypes = propTypes

export default Sider
