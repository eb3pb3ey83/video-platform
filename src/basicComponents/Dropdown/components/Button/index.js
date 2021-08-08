import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import BasicButton, { propTypes as ButtonPropTypes, defaultProps as ButtonDefaultProps } from '../../../Button'
import Icon from '@/basicComponents/Icon'
import Trigger, { PLACEMENTS, propTypes as TriggerPropTypes } from '../../../Trigger'

// Lib MISC

// Style
import styles from './style.module.scss'

// Variables / Functions
import { getPlacements, getTranslate3d } from '../../utils'
const cx = classnames.bind(styles)

export const propTypes = {
  type: ButtonPropTypes.type,
  size: ButtonPropTypes.size,
  shape: ButtonPropTypes.shape,
  isFilled: ButtonPropTypes.isFilled,
  prefix: ButtonPropTypes.prefix,
  suffix: ButtonPropTypes.suffix,
  htmlType: ButtonPropTypes.htmlType,
  buttonProps: PropTypes.shape({
    contentProps: ButtonPropTypes.contentProps,
    style: ButtonPropTypes.style,
    className: ButtonPropTypes.className,
  }),

  placementX: PropTypes.oneOf([PLACEMENTS.LEFT, PLACEMENTS.RIGHT, PLACEMENTS.CENTER]),
  placementY: PropTypes.oneOf([PLACEMENTS.TOP, PLACEMENTS.BOTTOM]),
  content: TriggerPropTypes.content,

  isBlock: PropTypes.bool,
  icon: PropTypes.shape({
    name: PropTypes.string,
    mode: PropTypes.string,
  }),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  className: PropTypes.string,
  isView: PropTypes.bool,
  children: PropTypes.any,
}

export const defaultProps = {
  type: ButtonDefaultProps.type,
  size: ButtonDefaultProps.size,
  shape: ButtonDefaultProps.shape,
  isFilled: ButtonDefaultProps.isFilled,
  prefix: ButtonDefaultProps.prefix,
  suffix: ButtonDefaultProps.suffix,
  htmlType: ButtonDefaultProps.htmlType,
  buttonProps: {
    contentProps: ButtonDefaultProps.contentProps,
    style: ButtonDefaultProps.style,
    className: ButtonDefaultProps.className,
  },

  placementX: PLACEMENTS.RIGHT,
  placementY: PLACEMENTS.BOTTOM,

  isBlock: false,
  isView: false,
}

class Button extends Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  constructor(props) {
    super(props)

    this.state = {
      isPopoverOpened: false,
    }
  }

  componentDidMount() {
    this.targetElement = ReactDOM.findDOMNode(this)
  }

  render() {
    const {
      type,
      size,
      shape,
      isFilled,
      prefix,
      suffix,
      htmlType,
      buttonProps,
      placementX,
      placementY,
      content,
      isBlock,
      icon,
      width,
      height,
      style,
      className,
      isView,
      children,
      ...restProps
    } = this.props
    const { isPopoverOpened } = this.state

    return (
      <BasicButton.Group
        className={cx('dropdown-button', className)}
        style={{ width, height, ...style }}
        size={size}
        shape={shape}
        data-is-block={isBlock}
        {...restProps}
      >
        <BasicButton type={type} isFilled={isFilled} prefix={prefix} suffix={suffix} htmlType={htmlType} isView={isView} {...buttonProps}>
          {children}
        </BasicButton>

        <Trigger
          from={{ transform: getTranslate3d(placementY, this.targetElement) }}
          to={{ zIndex: 1, transform: `translate3d(0px, 0px, 0px)` }}
          style={{ minWidth: '100%', zIndex: 1 }}
          placements={getPlacements(placementX, placementY)}
          targetElement={this.targetElement}
          appendTarget={this.targetElement}
          isOpened={isPopoverOpened}
          shouldOuterActionEmitOnTargetAction
          shouldOuterActionEmitOnSourceAction
          onOuterAction={event => this.setState({ isPopoverOpened: false })}
          content={content}
          {...restProps}
        >
          <BasicButton
            className={cx('dropdown-button__icon-wrapper')}
            type={type}
            isFilled={isFilled}
            size='xs'
            onClick={event => {
              event.stopPropagation()
              this.setState({ isPopoverOpened: true })
            }}
          >
            {isPopoverOpened && <Icon.ChevronUp role='dropdown-icon' />}
            {!isPopoverOpened && <Icon.ChevronDown role='dropdown-icon' />}
          </BasicButton>
        </Trigger>
      </BasicButton.Group>
    )
  }
}

export default Button
