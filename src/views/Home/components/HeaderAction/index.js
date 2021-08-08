import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  children: PropTypes.any,
}

function HeaderAction(props) {
  const { children } = props

  return <div className={cx('home-header-action')}>{children}</div>
}

HeaderAction.propTypes = propTypes

export default HeaderAction
