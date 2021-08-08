import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Content from './components/Content'
import Group, { propTypes as GroupPropTypes } from './components/Group'

// Lib MISC
import { ButtonContext } from './context'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  type: PropTypes.oneOf(['default', 'primary', 'link', 'danger', 'icon']),
  isFilled: PropTypes.bool.isRequired,
  isBlock: PropTypes.bool.isRequired,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  shape: PropTypes.oneOf(['rect', 'radius', 'rounded', 'circle']),
  align: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around']),
  href: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  contentProps: PropTypes.object,
  htmlType: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  forwardRef: PropTypes.any,
  isActive: PropTypes.bool,
  isView: PropTypes.bool,
}

export const defaultProps = {
  type: 'default',
  isFilled: true,
  isBlock: false,
  size: 'md',
  shape: 'radius',
  align: 'center',
  htmlType: 'button',
  isActive: false,
  isView: false,
}

function Button(props) {
  const {
    type,
    isFilled,
    isBlock,
    size,
    shape,
    align,
    href,
    width,
    height,
    prefix,
    suffix,
    contentProps = {},
    htmlType,
    style,
    className,
    children,
    forwardRef,
    isActive,
    isView,
    ...restProps
  } = props
  const context = useContext(ButtonContext)
  const hasContext = typeof context !== 'undefined'

  const elementType = typeof href === 'string' ? 'a' : 'button'

  return React.createElement(elementType, {
    className: cx(className, 'button'),
    role: 'button',
    'data-type': type,
    'data-is-filled': isFilled,
    'data-is-block': isBlock,
    'data-size': hasContext && context.size ? context.size : size,
    'data-shape': hasContext && context.shape ? context.shape : shape,
    'data-is-active': isActive,
    'data-is-view': isView,
    type: elementType === 'a' ? null : htmlType,
    href,
    style: { width, height, justifyContent: align, ...style },
    ref: forwardRef,
    children: (
      <>
        {prefix}
        <Content {...contentProps}>{children}</Content>
        {suffix}
      </>
    ),
    ...restProps,
  })
}

Button.propTypes = propTypes
Button.defaultProps = defaultProps

const ButtonWithRef = React.forwardRef((props, ref) => <Button forwardRef={ref} {...props} />)

ButtonWithRef.Group = Group

export { GroupPropTypes }
export default ButtonWithRef
