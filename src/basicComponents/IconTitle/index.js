// Libs
import React from 'react'
import classnames from 'classnames/bind'
import PropTypes from 'prop-types'

// Components

// Lib MISC

// Style
import styles from './style.module.scss'
const cx = classnames.bind(styles)

// PropTypes
export const propTypes = {
  children: PropTypes.any,
  titleName: PropTypes.string,
}

function IconTitle(props) {
  const { children, titleName } = props
  return (
    <div className={cx('icon-title')}>
      {children}
      <span className={cx('icon-title__name')}>{titleName}</span>
    </div>
  )
}

IconTitle.propTypes = propTypes

export default IconTitle
