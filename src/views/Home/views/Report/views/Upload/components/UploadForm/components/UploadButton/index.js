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
  onExcelEmportClick: PropTypes.func,
}

function UploadButton(props) {
  const { className, onExcelEmportClick } = props

  return (
    <div className={cx('upload-button-wrapper', className)}>
      <Button className={cx('upload-button')} size='sm' type='primary' htmlType='button' prefix={<Icon.Export />} onClick={onExcelEmportClick}>
        匯出Excel檔
      </Button>
    </div>
  )
}

UploadButton.propTypes = propTypes

export default UploadButton
