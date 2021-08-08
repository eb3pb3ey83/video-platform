import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
// import Count from './components/Count'
import Dot, { propTypes as DotPropTypes } from './components/Dot'
import Text from './components/Text'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  isDotOnly: PropTypes.bool,
  type: PropTypes.oneOf(['primary', 'warn', 'gray-dark']),
  status: PropTypes.oneOf(['default', 'processing']), // works in dot only
  count: PropTypes.number,
  overflowCount: PropTypes.number.isRequired,
  shouldShowZero: PropTypes.bool.isRequired,
  title: PropTypes.string,
  text: PropTypes.node, // works in dot only
  size: DotPropTypes.size, // works in dot only
  contentProps: PropTypes.object,
  textProps: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.any,
}

export const defaultProps = {
  type: 'primary',
  status: 'default',
  overflowCount: 99,
  shouldShowZero: false,
}

function Badge(props) {
  const {
    isDotOnly,
    type,
    status,
    count,
    overflowCount,
    shouldShowZero,
    title: propTitle,
    text,
    size,
    contentProps = {},
    textProps = {},
    className,
    children,
    ...restProps
  } = props

  const hasChildren = React.Children.count(children) > 0
  const mode = hasChildren ? 'dressed' : 'naked'

  const shouldShowDot = isDotOnly

  const title = typeof propTitle === 'string' ? propTitle : count

  return (
    <span className={cx('badge', className)} data-mode={mode} {...restProps}>
      {children}
      {shouldShowDot && <Dot title={title} data-type={type} data-status={status} size={size} {...contentProps} />}
      {shouldShowDot && typeof text !== 'undefined' && <Text {...textProps}>{text}</Text>}
    </span>
  )
}

Badge.propTypes = propTypes
Badge.defaultProps = defaultProps

export default Badge
