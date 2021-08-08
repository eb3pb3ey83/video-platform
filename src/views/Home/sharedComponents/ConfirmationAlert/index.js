import React from 'react'
import PropTypes from 'prop-types'

// Components
import Button from '@/basicComponents/Button'
import Modal from '@/basicComponents/Modal'

// Lib MISC

export const propTypes = {
  isOpened: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  confirmTitle: PropTypes.string,
  confirmText: PropTypes.string,
}

function ConfirmationAlert(props) {
  const { isOpened, onClose, onConfirm, confirmTitle, confirmText } = props

  return (
    <Modal isOpened={isOpened} onClose={onClose}>
      <Modal.Header>{confirmTitle}</Modal.Header>
      <Modal.Body>{confirmText}</Modal.Body>
      <Modal.Footer>
        <Button type='default' size='sm' onClick={onClose}>
          取消
        </Button>
        <Button type='primary' size='sm' onClick={onConfirm}>
          確認
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

ConfirmationAlert.propTypes = propTypes

export default ConfirmationAlert
