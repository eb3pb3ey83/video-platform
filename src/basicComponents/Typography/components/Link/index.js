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
  withUnderline: PropTypes.bool,
  withHoveringUnderline: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.any,
}

export const defaultProps = {
  color: 'primary',
  withUnderline: false,
  withHoveringUnderline: false,
}

function Link(props) {
  const { withUnderline, withHoveringUnderline, className, ...restProps } = props

  return (
    <Typography
      element='a'
      className={cx('typography-link', className)}
      data-with-underline={withUnderline}
      data-with-hovering-underline={withHoveringUnderline}
      {...restProps}
    />
  )
}

Link.propTypes = propTypes
Link.defaultProps = defaultProps

export default Link
