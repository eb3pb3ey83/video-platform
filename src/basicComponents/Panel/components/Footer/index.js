import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  align: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around']),
  style: PropTypes.object,
  className: PropTypes.string,
}

export const defaultProps = {
  align: 'flex-end',
}

function Footer(props) {
  const { align, style, className, ...restProps } = props

  return <div className={cx('panel-footer', className)} style={{ ...style, justifyContent: align }} {...restProps} />
}

Footer.propTypes = propTypes
Footer.defaultProps = defaultProps

export default Footer
