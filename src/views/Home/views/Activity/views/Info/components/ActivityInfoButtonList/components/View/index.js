import React from 'react'
import styles from './style.module.scss'
import classnames from 'classnames/bind'
import PropTypes from 'prop-types'

// Components
import Icon from '@/basicComponents/Icon'
import Button from '@/basicComponents/Button'
import ActivityInfoColumn from '../../../../sharedComponents/ActivityInfoColumn'
// Lib MISC

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  onModeChange: PropTypes.func,
  toggleAlert: PropTypes.func,
  onUploadClick: PropTypes.func,
  permissions: PropTypes.shape({
    isShowContact: PropTypes.bool,
    isShowEditButton: PropTypes.bool,
    isShowRemoveButton: PropTypes.bool,
    isShowUploadButton: PropTypes.bool,
  }),
}

function View(props) {
  const { onModeChange, permissions, toggleAlert, onUploadClick } = props
  const { isShowEditButton, isShowRemoveButton, isShowUploadButton } = permissions

  return (
    <ActivityInfoColumn>
      {isShowRemoveButton && (
        <Button
          onClick={toggleAlert}
          isBlock
          className={cx('activity-info__button')}
          size='sm'
          type='default'
          htmlType='button'
          prefix={<Icon.Delete className={cx('delete-button__button-icon')} />}
        >
          刪除活動
        </Button>
      )}

      {isShowEditButton && (
        <Button
          onClick={onModeChange}
          isBlock
          className={cx('activity-info__button')}
          size='sm'
          type='default'
          htmlType='button'
          prefix={<Icon.Edit />}
        >
          編輯活動
        </Button>
      )}

      {isShowUploadButton && (
        <Button
          onClick={onUploadClick}
          isBlock
          className={cx('activity-info__button')}
          size='sm'
          type='primary'
          htmlType='button'
          prefix={<Icon.Upload role='upload-icon' />}
        >
          上傳影音
        </Button>
      )}
    </ActivityInfoColumn>
  )
}

View.propTypes = propTypes

export default View
