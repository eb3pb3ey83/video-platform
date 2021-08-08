// Libs
import React from 'react'
import { CSSTransition as ReactCSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'

// Lib MISC

// Components

// Style

// Variables / Functions

// PropTypes
export const propTypes = {
  children: PropTypes.node,
  classNames: PropTypes.object,
}

// DefaultProps
export const defaultProps = {}

export function getClassNames(cx, className) {
  return {
    enter: cx(`${className}-enter`),
    enterActive: cx(`${className}-enter-active`),
    enterDone: cx(`${className}-enter-active`),
    exit: cx(`${className}-exit`),
    exitActive: cx(`${className}-exit-active`),
    exitDone: cx(`${className}-exit-active`),
  }
}

function CSSTransition(props) {
  const { children, classNames, ...restProps } = props

  return (
    <ReactCSSTransition classNames={classNames} {...restProps}>
      {children}
    </ReactCSSTransition>
  )
}

CSSTransition.propTypes = propTypes
CSSTransition.defaultProps = defaultProps

export default CSSTransition
