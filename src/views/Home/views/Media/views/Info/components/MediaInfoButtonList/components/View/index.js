import React from 'react'
import styles from './style.module.scss'
import classnames from 'classnames/bind'
import PropTypes from 'prop-types'

// Components
import Icon from '@/basicComponents/Icon'
import Button from '@/basicComponents/Button'
import MediaInfoColumn from '../../../../sharedComponents/MediaInfoColumn'

// Lib MISC
import { onDownloadClick } from './eventHandler/methods/onDownloadClick'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  onModeChange: PropTypes.func,
  toggleAlert: PropTypes.func,
  downloadData: PropTypes.shape({
    attachmentId: PropTypes.number,
    organizationId: PropTypes.number,
  }),
  permissions: PropTypes.shape({
    isShowDownloadButton: PropTypes.bool,
    isShowEditButton: PropTypes.bool,
    isShowRemoveButton: PropTypes.bool,
    isDisabledDownloadButton: PropTypes.bool,
    isDisabledEditButton: PropTypes.bool,
    isDisabledRemoveButton: PropTypes.bool,
  }),
}

function View(props) {
  const { downloadData, onModeChange, toggleAlert, permissions } = props

  const {
    isShowDownloadButton,
    isShowEditButton,
    isShowRemoveButton,
    isDisabledDownloadButton,
    isDisabledEditButton,
    isDisabledRemoveButton,
  } = permissions

  return (
    <MediaInfoColumn gridArea='button'>
      {isShowDownloadButton && (
        <Button
          onClick={() => onDownloadClick(downloadData)}
          disabled={isDisabledDownloadButton}
          isBlock
          className={cx('media-info__button')}
          size='sm'
          type='primary'
          htmlType='button'
          prefix={<Icon.Download />}
        >
          下載檔案
        </Button>
      )}

      {isShowEditButton && (
        <Button
          onClick={onModeChange}
          disabled={isDisabledEditButton}
          isBlock
          className={cx('media-info__button')}
          size='sm'
          type='default'
          htmlType='button'
          prefix={<Icon.Edit />}
        >
          編輯檔案
        </Button>
      )}

      {isShowRemoveButton && (
        <Button
          onClick={toggleAlert}
          disabled={isDisabledRemoveButton}
          isBlock
          className={cx('media-info__button')}
          size='sm'
          type='default'
          htmlType='button'
          prefix={<Icon.Delete className={cx('media-info__delete-icon')} />}
        >
          刪除檔案
        </Button>
      )}
    </MediaInfoColumn>
  )
}

View.propTypes = propTypes

export default View
