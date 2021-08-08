import React from 'react'
import styles from './style.module.scss'
import classnames from 'classnames/bind'
import PropTypes from 'prop-types'

// Components

// Lib MISC

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

function ActivityInfoColumn(props) {
  const { children, className } = props

  return <div className={cx('activity-info__column', className)}>{children}</div>
}

ActivityInfoColumn.propTypes = propTypes

export default ActivityInfoColumn
