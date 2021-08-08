import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Footer from './components/Footer'
import Header from './components/Header'
import Sider from './components/Sider'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  margin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  hasSider: PropTypes.bool,
  hasBorder: PropTypes.bool,
  hasShadow: PropTypes.bool,
  isScrollable: PropTypes.bool,
  grow: PropTypes.number,
  shrink: PropTypes.number,
  direction: PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.any,
  forwardRef: PropTypes.any,
}

export const defaultProps = {
  hasBorder: true,
  hasShadow: true,
  isScrollable: true,
}

function Panel(props) {
  const {
    width,
    height,
    margin,
    padding,
    hasSider: propHasSider,
    hasBorder,
    hasShadow,
    isScrollable,
    grow,
    shrink,
    direction,
    style,
    className,
    children,
    forwardRef,
    ...restProps
  } = props

  const hasSider =
    propHasSider ||
    React.Children.map(children, child => child && child.type && child.type.displayName === Sider.displayName).filter(Boolean).length > 0

  return (
    <div
      ref={forwardRef}
      className={cx('panel', className)}
      data-has-sider={hasSider}
      style={{
        width,
        height,
        margin,
        padding,
        border: !hasBorder && 'none',
        boxShadow: !hasShadow && 'none',
        overflow: isScrollable && 'auto',
        flexGrow: grow,
        flexShrink: shrink,
        flexDirection: direction,
        ...style,
      }}
      {...restProps}
    >
      {children}
    </div>
  )
}

Panel.propTypes = propTypes
Panel.defaultProps = defaultProps

const PanelWithRef = React.forwardRef((props, ref) => <Panel forwardRef={ref} {...props} />)

PanelWithRef.Footer = Footer
PanelWithRef.Header = Header
PanelWithRef.Sider = Sider

export default PanelWithRef
