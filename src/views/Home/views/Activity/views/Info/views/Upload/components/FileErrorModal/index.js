// Libs
import React from 'react'
import PropTypes from 'prop-types'
import styles from './style.module.scss'
import classnames from 'classnames/bind'
import { isEmpty } from 'lodash'

// Components
import Icon from '@/basicComponents/Icon'
import Typography from '@/basicComponents/Typography'
import AlertModal from '@/basicComponents/AlertModal'

// Lib MISC

// constants
import { MAXIMUM_FILE_SIZE_IN_GIGABYTES } from '../../../constants'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  isOpened: PropTypes.bool,
  onClose: PropTypes.func,
  errorFiles: PropTypes.array,
}

// DefaultProps
export const defaultProps = {
  errorFiles: [],
}

function FileErrorModal(props) {
  const { isOpened, onClose, errorFiles } = props
  return (
    <AlertModal
      isOpened={isOpened}
      modalTitle={
        <>
          <Icon.Alert />
          <Typography.Text size='lg' marginLeft={8}>
            {isEmpty(errorFiles) ? '請選擇影音媒體' : '無法上傳'}
          </Typography.Text>
        </>
      }
      hasCancelButton={false}
      onClose={onClose}
      confirmButtonText='關閉'
      size={isEmpty(errorFiles) ? 'sm' : 'lg'}
    >
      {isEmpty(errorFiles)
        ? '請選擇至少一個影音媒體上傳'
        : errorFiles.map((file, index) => {
            const { isValidFile, isValidSize, isUniqueFile } = file
            return (
              <>
                {!isValidFile && (
                  // 為避免同一個檔案，同時有複數的警告訊息，所以在key的名稱上加上種類
                  <div key={`${file.name}_!isValidFile_${new Date()}`} className={cx('file-error-modal__text')}>
                    {file.name} 不符合檔案格式，無法上傳。
                  </div>
                )}
                {!isValidSize && (
                  <div key={`${file.name}_!isValidSize_${new Date()}`} className={cx('file-error-modal__text')}>
                    {file.name} 超過{MAXIMUM_FILE_SIZE_IN_GIGABYTES}G, 無法上傳。
                  </div>
                )}
                {!isUniqueFile && (
                  <div key={`${file.name}_!isUniqueFile_${new Date()}`} className={cx('file-error-modal__text')}>
                    {file.name} 已重複，無法上傳。
                  </div>
                )}
              </>
            )
          })}
    </AlertModal>
  )
}

FileErrorModal.propTypes = propTypes
FileErrorModal.defaultProps = defaultProps
export default FileErrorModal
