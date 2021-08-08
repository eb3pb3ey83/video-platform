import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Typography from '../Typography'

// Lib MISC

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  name: PropTypes.oneOf(['BebasNeue']),
  style: PropTypes.object,
  className: PropTypes.string,
}

export const defaultProps = {}

function FontFamily(props) {
  const { name, style, className, ...restProps } = props

  return <Typography element='span' className={cx('typography-font-family', className)} style={{ fontFamily: name, ...style }} {...restProps} />
}

FontFamily.propTypes = propTypes
FontFamily.defaultProps = defaultProps

export default FontFamily
