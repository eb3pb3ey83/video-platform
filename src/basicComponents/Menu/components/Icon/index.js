import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import BasicIcon from '../../../Icon'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  className: PropTypes.string,
}

function Icon(props) {
  const { className, ...restProps } = props

  return <BasicIcon className={cx('menu-icon', className)} role='menu-icon' {...restProps} />
}

Icon.propTypes = propTypes

export default Icon
