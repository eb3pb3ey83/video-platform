import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Content from './components/Content'
import CSSTransition, { getClassNames } from '@/basicComponents/CSSTransition'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  isCollapsible: PropTypes.bool,
  isCollapsed: PropTypes.bool,
  defaultCollapsed: PropTypes.bool,
  collapsedWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onCollapse: PropTypes.func,
  contentProps: PropTypes.object,
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.any,
}

export const defaultProps = {
  isCollapsible: true,
  collapsedWidth: 70,
  width: 228,
}

function Sider(props) {
  const {
    isCollapsible,
    isCollapsed: propIsCollapsed,
    defaultCollapsed,
    collapsedWidth,
    width,
    onCollapse: propOnCollapse,
    contentProps = {},
    style,
    className,
    children,
    ...restProps
  } = props
  const { style: contentPropStyle } = contentProps

  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed || propIsCollapsed || false)

  useEffect(() => {
    if (typeof propIsCollapsed === 'boolean' && isCollapsed !== propIsCollapsed) {
      setIsCollapsed(propIsCollapsed)
    }
  }, [isCollapsed, propIsCollapsed])

  // Events
  const onCollapse = event => {
    const newIsCollapsed = !isCollapsed

    setIsCollapsed(newIsCollapsed)

    if (typeof propOnCollapse === 'function') {
      propOnCollapse(event, newIsCollapsed)
    }
  }

  return (
    <aside className={cx('layout-sider', className)} style={style} {...restProps}>
      <CSSTransition in={!isCollapsed} timeout={300} classNames={getClassNames(cx, 'layout-sider-content')}>
        <Content
          isCollapsed={isCollapsed}
          style={contentPropStyle}
          onMouseEnter={isCollapsible && isCollapsed ? onCollapse : null}
          onMouseLeave={isCollapsible && !isCollapsed ? onCollapse : null}
          {...contentProps}
        >
          {children}
        </Content>
      </CSSTransition>
    </aside>
  )
}

Sider.displayName = 'Layout.Sider'
Sider.propTypes = propTypes
Sider.defaultProps = defaultProps

export default Sider
