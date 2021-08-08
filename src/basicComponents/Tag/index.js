import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components

// Lib MISC

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  type: PropTypes.oneOf(['gray', 'primary', 'warn', 'danger', 'secondary']).isRequired,
  htmlType: PropTypes.string,
  className: PropTypes.string,
}

export const defaultProps = {
  type: 'primary',
}

function Tag(props) {
  const { type, htmlType, className, ...restProps } = props

  return <span className={cx('tag', className)} type={htmlType} data-type={type} {...restProps} />
}

Tag.propTypes = propTypes
Tag.defaultProps = defaultProps

export default Tag
