import React from 'react'
import PropTypes from 'prop-types'
import styles from './style.module.scss'
import classnames from 'classnames/bind'

// Components

// Style

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  onTabItemClick: PropTypes.func,
  currentReportTab: PropTypes.string,
}

function TabItem(props) {
  const { title, path, onTabItemClick, currentReportTab, ...restProps } = props

  return (
    <div className={cx('tab-item')} data-tab={path} data-is-active={path === currentReportTab} onClick={onTabItemClick} {...restProps}>
      <span>{title}</span>
    </div>
  )
}

TabItem.propTypes = propTypes

export default TabItem
