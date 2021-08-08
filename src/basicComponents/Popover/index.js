import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import classnames from 'classnames/bind'

// Components
import Trigger, { PLACEMENTS } from '@/basicComponents/Trigger'

// Style
import styles from './style.module.scss'

// Variables / Functions
import { getTranslate3d, getPlacements, getTip } from './utils'

const cx = classnames.bind(styles)

export const propTypes = {
  placement: PropTypes.oneOf([PLACEMENTS.TOP, PLACEMENTS.RIGHT, PLACEMENTS.BOTTOM, PLACEMENTS.LEFT]),
  content: PropTypes.node,
  tipSize: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.number]),
  appendTarget: PropTypes.elementType,
  padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.any,
  targetStyle: PropTypes.object,
}

export const defaultProps = {
  placement: PLACEMENTS.BOTTOM,
  tipSize: 16,
  padding: 16,
}

class Popover extends Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  componentDidMount() {
    this.targetElement = ReactDOM.findDOMNode(this)
  }

  render() {
    const { placement, content, tipSize, appendTarget, padding, style, className, children, targetStyle, ...restProps } = this.props

    const target = appendTarget || this.targetElement

    return (
      <Trigger
        from={{ transform: getTranslate3d(placement, target) }}
        to={{ zIndex: 1, transform: `translate3d(0px, 0px, 0px)` }}
        style={{ padding, ...style }}
        className={cx('popover', className)}
        placements={getPlacements(placement, tipSize)}
        content={
          <>
            {getTip(placement, tipSize, cx('popover__tip', `popover__tip--${placement}`))}
            {content}
          </>
        }
        appendTarget={target}
        {...restProps}
      >
        <div className={cx('popover__target')} style={targetStyle}>
          {children}
        </div>
      </Trigger>
    )
  }
}

export default Popover
