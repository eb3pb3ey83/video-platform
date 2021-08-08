import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  className: PropTypes.string,
}

function Item(props) {
  const { padding, height, style, className, ...restProps } = props

  return <li className={cx('menu-item', className)} role='menu-item' style={{ padding, height, ...style }} {...restProps} />
}

Item.propTypes = propTypes

export default Item
