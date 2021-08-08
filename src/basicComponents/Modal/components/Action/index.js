import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Button from '../../../Button'
import Icon from '../../../Icon'
import Group from './components/Group'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  type: PropTypes.oneOf(['update', 'delete']),
  htmlType: PropTypes.string,
  className: PropTypes.string,
}

export const defaultProps = {
  htmlType: 'button',
}

function Action(props) {
  const { type, className, ...restProps } = props

  const iconProps = {}
  switch (type) {
    case 'update':
      iconProps.name = 'file-edit'
      iconProps.mode = '02'
      break

    case 'delete':
      iconProps.name = 'trash'
      iconProps.mode = '01'
      break
  }

  return (
    <Button className={cx('modal-action', className)} type='icon' size='xs' {...restProps}>
      <Icon {...iconProps} />
    </Button>
  )
}

Action.propTypes = propTypes
Action.defaultProps = defaultProps

Action.Group = Group

export default Action
