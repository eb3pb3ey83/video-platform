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

function Content(props) {
  const { className, ...restProps } = props

  return <span className={cx('menu-content', className)} role='menu-content' {...restProps} />
}

Content.propTypes = propTypes

export default Content
