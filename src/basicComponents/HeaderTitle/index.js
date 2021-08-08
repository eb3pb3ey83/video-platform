import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  className: PropTypes.string,
}

function HeaderTitle(props) {
  const { className, ...restProps } = props

  return <h1 className={cx('home-header-title', className)} {...restProps} />
}

HeaderTitle.propTypes = propTypes

export default HeaderTitle
