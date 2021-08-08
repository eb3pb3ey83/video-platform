import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Button from '@/basicComponents/Button'
import Icon from '@/basicComponents/Icon'

// Style
import styles from './style.module.scss'

// Lib MISC

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
}

function CreateButton(props) {
  const { className, onClick, disabled } = props

  return (
    <div className={cx('edit-button-wrapper', className)}>
      <Button
        size='sm'
        type='primary'
        isFilled={false}
        htmlType='button'
        prefix={<Icon.Add style={{ fill: disabled ? '#c6cbd4' : '#2a69c7' }} />}
        shape='rounded'
        onClick={onClick}
        disabled={disabled}
      >
        新增細項
      </Button>
    </div>
  )
}

CreateButton.propTypes = propTypes

export default CreateButton
