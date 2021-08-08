import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Icon from './components/Icon'
import Item from './components/Item'
import Content from './components/Content'
import Link from './components/Link'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  elementType: PropTypes.string,
  type: PropTypes.oneOf(['default', 'primary']),
  shape: PropTypes.oneOf(['rect', 'radius']),
  padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  className: PropTypes.string,
}

export const defaultProps = {
  elementType: 'ul',
  type: 'default',
  shape: 'rect',
}

function Menu(props) {
  const { elementType, type, shape, padding, style, className, ...restProps } = props

  return React.createElement(elementType, {
    className: cx('menu', className),
    style: { padding, ...style },
    'data-type': type,
    'data-shape': shape,
    ...restProps,
  })
}

Menu.propTypes = propTypes
Menu.defaultProps = defaultProps

Menu.Icon = Icon
Menu.Item = Item
Menu.Content = Content
Menu.Link = Link

export default Menu
