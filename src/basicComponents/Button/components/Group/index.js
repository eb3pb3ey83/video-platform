import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Lib MISC
import { ButtonContext } from '../../context'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  shape: PropTypes.oneOf(['rect', 'radius', 'rounded', 'circle']),
  isBlock: PropTypes.bool,
  className: PropTypes.string,
}

export const defaultProps = {
  direction: 'horizontal',
  isBlock: false,
}

function Group(props) {
  const { direction, size, shape, isBlock, className, ...restProps } = props

  const context = { size, shape }

  return (
    <ButtonContext.Provider value={context}>
      <div className={cx('button-group', className)} data-direction={direction} data-is-block={isBlock} {...restProps} />
    </ButtonContext.Provider>
  )
}

Group.propTypes = propTypes
Group.defaultProps = defaultProps

export default Group
