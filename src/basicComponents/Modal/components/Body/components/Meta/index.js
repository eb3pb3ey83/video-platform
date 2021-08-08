import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Styles
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  className: PropTypes.string,
}

export const defaultProps = {}

function Meta(props) {
  const { className, ...restProps } = props

  return <div className={cx('modal-body-meta', className)} {...restProps} />
}

Meta.propTypes = propTypes
Meta.defaultProps = defaultProps

export default Meta
