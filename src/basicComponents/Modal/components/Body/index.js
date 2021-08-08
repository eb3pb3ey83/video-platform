import React, { useRef, useContext } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Meta from './components/Meta'

// Lib MISC
import { ModalContext } from '../../context'

// Styles
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  isHalf: PropTypes.bool,
  withMaxHeight: PropTypes.bool,
  align: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around']),
  padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  className: PropTypes.string,
  forwardRef: PropTypes.any,
}

export const defaultProps = {
  isHalf: false,
  withMaxHeight: true,
  padding: `24px 32px`,
}

function Body(props) {
  const { isHalf, withMaxHeight, align, padding, className, forwardRef, style, ...restProps } = props

  const ref = useRef(forwardRef)
  const context = useContext(ModalContext)

  return (
    <section
      {...restProps}
      style={{
        ...style,
        justifyContent: align,
        padding,
        maxHeight: withMaxHeight && `calc(100vh - ${context.paddingVertical}px - ${context.headerHeight}px - ${context.footerHeight}px)`,
      }}
      className={cx('modal-body', className)}
      data-is-half={isHalf}
      ref={ref}
    />
  )
}

Body.propTypes = propTypes
Body.defaultProps = defaultProps

const BodyWithRef = React.forwardRef((props, ref) => <Body {...props} forwardRef={ref} />)

BodyWithRef.Meta = Meta

export default BodyWithRef
