import React from 'react'
import PropTypes from 'prop-types'

// Components
import Icon from '@/basicComponents/Icon'
import Typography from '@/basicComponents/Typography'
import AlertModal from '@/basicComponents/AlertModal'

// Lib MISC

// Variables / Functions

export const propTypes = {
  isOpened: PropTypes.bool,
  onConfirm: PropTypes.func,
  onClose: PropTypes.func,
}

function DeleteInfoModal(props) {
  const { isOpened, onConfirm, onClose } = props

  return (
    <>
      <AlertModal
        size='sm'
        isOpened={isOpened}
        onConfirm={onConfirm}
        onClose={onClose}
        modalTitle={
          <>
            <Icon.Alert />
            <Typography.Text size='lg' marginLeft={8}>
              確認刪除此媒體?
            </Typography.Text>
          </>
        }
        confirmButtonText='刪除'
      >
        媒體一經刪除後，將無法復原，是否仍要刪除媒體?
      </AlertModal>
    </>
  )
}

DeleteInfoModal.propTypes = propTypes

export default DeleteInfoModal
