import PropTypes from 'prop-types'
import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

export const propTypes = {
  children: PropTypes.any,
  forwardRef: PropTypes.any,
  removeMargin: PropTypes.bool,
  hideHorizontal: PropTypes.bool,
  hideVertical: PropTypes.bool,
  autoHide: PropTypes.bool,
  innerProps: PropTypes.any,
}

export const defaultProps = {
  autoHide: true,
}

function Scrollbar({ autoHide, removeMargin = false, hideHorizontal, hideVertical, innerProps = {}, children, forwardRef, ...props }) {
  // ie 需要將margin right and margin bottom 改成0
  const viewStyle = removeMargin && (!!window.ActiveXObject || 'ActiveXObject' in window) ? { marginBottom: 0, marginRight: 0 } : {}
  const { style: innerStyle, ...restInnerProp } = innerProps

  return (
    <Scrollbars
      ref={forwardRef}
      autoHide={autoHide}
      {...props}
      renderView={({ style, ...props }) => (
        <div
          className='view'
          style={{
            ...style,
            ...viewStyle,
            overflowX: hideHorizontal ? 'hidden' : 'scroll',
            overflowY: hideVertical ? 'hidden' : 'scroll',
            ...innerStyle,
          }}
          {...props}
          {...restInnerProp}
        />
      )}
    >
      {children}
    </Scrollbars>
  )
}

Scrollbar.propTypes = propTypes

export default Scrollbar
