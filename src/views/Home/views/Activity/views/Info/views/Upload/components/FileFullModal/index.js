// Libs
import React from 'react'
import PropTypes from 'prop-types'
// import styles from './style.module.scss'
// import classnames from 'classnames/bind'

// Components
import Icon from '@/basicComponents/Icon'
import Typography from '@/basicComponents/Typography'
import AlertModal from '@/basicComponents/AlertModal'

// Lib MISC

// Variables / Functions
// const cx = classnames.bind(styles)

export const propTypes = {
  isOpened: PropTypes.bool,
  onClose: PropTypes.func,
}

// DefaultProps
export const defaultProps = {
  errorFiles: [],
}

function FileErrorModal(props) {
  const { isOpened, onClose } = props
  return (
    <AlertModal
      isOpened={isOpened}
      modalTitle={
        <>
          <Icon.Alert />
          <Typography.Text size='lg' marginLeft={8}>
            檔案上傳數量已超過限制
          </Typography.Text>
        </>
      }
      hasCancelButton={false}
      onClose={onClose}
      confirmButtonText='關閉'
      size='sm'
    >
      已超過上傳數量限制，請重新檢視上傳檔案!
    </AlertModal>
  )
}

FileErrorModal.propTypes = propTypes
FileErrorModal.defaultProps = defaultProps
export default FileErrorModal
