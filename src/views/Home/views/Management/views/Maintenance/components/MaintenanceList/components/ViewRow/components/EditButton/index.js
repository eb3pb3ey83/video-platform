import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Button from '@/basicComponents/Button'

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

function EditButton(props) {
  const { className, onClick, disabled } = props

  return (
    <div className={cx('edit-button-wrapper', className)}>
      <Button className={cx('edit-button')} size='sm' type='primary' htmlType='button' onClick={onClick} disabled={disabled}>
        編輯
      </Button>
    </div>
  )
}

EditButton.propTypes = propTypes

export default EditButton
