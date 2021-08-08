import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  isScrollable: PropTypes.bool,
  isFlexbox: PropTypes.bool,
  align: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around']),
  padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  className: PropTypes.string,
}

function Content(props) {
  const { isScrollable, isFlexbox, align, padding, style, className, ...restProps } = props

  return (
    <section
      className={cx('layout-content', className)}
      style={{ overflow: isScrollable && 'auto', padding, display: isFlexbox && 'flex', justifyContent: align, ...style }}
      role='layout-content'
      {...restProps}
    />
  )
}

Content.propTypes = propTypes

export default Content
