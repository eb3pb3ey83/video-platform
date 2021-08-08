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
}

function RecordButton(props) {
  const { className, onClick } = props

  return (
    <div className={cx('record-button-wrapper', className)}>
      <Button className={cx('record-button')} size='sm' type='primary' htmlType='button' prefix={<Icon.Private />} onClick={onClick}>
        開放權限
      </Button>
    </div>
  )
}

RecordButton.propTypes = propTypes

export default RecordButton
