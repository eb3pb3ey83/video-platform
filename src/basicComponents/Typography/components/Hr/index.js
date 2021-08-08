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
  className: PropTypes.string,
}

export const defaultProps = {
  isBlock: true,
}

function Hr(props) {
  const { className, ...restProps } = props

  return <Typography element='hr' className={cx('typography-hr', className)} {...restProps} />
}

Hr.propTypes = propTypes
Hr.defaultProps = defaultProps

export default Hr
