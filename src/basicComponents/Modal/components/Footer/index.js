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
  align: PropTypes.oneOf(['left', 'center', 'right']),
  style: PropTypes.object,
  className: PropTypes.string,
}

export const defaultProps = {
  align: 'right',
}

function Footer(props) {
  const { align, style, className, ...restProps } = props

  const ref = useRef(null)
  const size = useComponentSize(ref)
  const context = useContext(ModalContext)

  context.setFooterHeight(size.height)

  return <footer ref={ref} className={cx('modal-footer', className)} style={{ ...style, textAlign: align }} {...restProps} />
}

Footer.displayName = 'Modal.Footer'

Footer.propTypes = propTypes
Footer.defaultProps = defaultProps

export default Footer
