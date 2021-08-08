// Libs
import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Icon from '@/basicComponents/Icon'

// Lib MISC
import { useUploadItemState } from './eventHandler/comptuedValues/useUploadItemState'
import { onItemMouseOver } from './eventHandler/methods/onItemMouseOver'
import { useProgressBarValue } from './eventHandler/comptuedValues/useProgressBarValue'
import { useUploadRequestSender } from './eventHandler/effect/useUploadRequestSender'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

// PropTypes
export const propTypes = {
  uploadItemData: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.string,
    errorMessage: PropTypes.string,
    assetPath: PropTypes.string,
    progress: PropTypes.number,
    startRequest: PropTypes.func,
    uploadState: PropTypes.object,
    secondsRemaining: PropTypes.number,
  }),
}

// DefaultProps
export const defaultProps = {
  uploadItemData: PropTypes.shape({
    id: '',
    name: '',
    errorMessage: '',
    progress: 0,
  }),
}

function UploadItem(props) {
  const { uploadItemData } = props
  const { name, errorMessage, assetPath, uploadState } = uploadItemData
  const { progressBarValue } = useProgressBarValue(uploadItemData)
  const { currentLayoutState, setStateName } = useUploadItemState(progressBarValue, uploadItemData)
  const { handleOnDelete, handleOnClick, icon } = currentLayoutState
  const iconWrapperRef = useRef(null)
  const hasErrorMessage = Boolean(errorMessage)

  useUploadRequestSender(uploadItemData)

  return (
    <li className={cx('upload-item')} onMouseOver={event => onItemMouseOver({ event, currentLayoutState, setStateName, iconWrapperRef })}>
      <div className={cx('file-name-wrapper')}>
        {!assetPath && <div className={cx('file-name-wrapper__name')}>{name}</div>}

        {hasErrorMessage && (
          <>
            <div className={cx('error-message')}>{errorMessage}</div>
            <button className={cx('delete-button')} onClick={handleOnDelete}>
              <Icon.Delete className={cx('delete-button__icon')} />
            </button>
          </>
        )}
      </div>

      <div
        className={cx('icon-wrapper')}
        data-is-uploading={uploadState?.isUploading}
        data-is-success={uploadState?.isUploadSuccess}
        onClick={handleOnClick}
        ref={iconWrapperRef}
      >
        {icon}
      </div>
    </li>
  )
}

UploadItem.propTypes = propTypes
UploadItem.defaultProps = defaultProps

export default UploadItem
