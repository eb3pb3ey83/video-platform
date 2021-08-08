import React, { useRef, useContext } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import useComponentSize from '@rehooks/component-size'

// Lib MISC
import { ModalContext } from '../../context'

// Styles
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  align: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around']),
  style: PropTypes.object,
  className: PropTypes.string,
  type: PropTypes.string,
}

export const defaultProps = {
  align: 'flex-start',
  type: 'default',
}

function Header(props) {
  const { align, style, className, type, ...restProps } = props

  const ref = useRef(null)
  const size = useComponentSize(ref)
  const context = useContext(ModalContext)

  context.setHeaderHeight(size.height)

  return <header ref={ref} className={cx('modal-header', className)} style={{ ...style, justifyContent: align }} data-type={type} {...restProps} />
}

Header.displayName = 'Modal.Header'
Header.propTypes = propTypes
Header.defaultProps = defaultProps

export default Header
