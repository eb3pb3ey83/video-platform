import React from 'react'
import PropTypes from 'prop-types'
// import classnames from 'classnames/bind'
// import styles from './style.module.scss'
// import PropTypes from 'prop-types'

// Components
import Modal, { withModal } from '@/basicComponents/Modal'
import Button from '@/basicComponents/Button'

// Lib MISC

// Variables / Functions
// const cx = classnames.bind(styles)

export const propTypes = {
  children: PropTypes.any,
  hasCancelButton: PropTypes.bool,
  confirmButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  onClose: PropTypes.func,
}

export const defaultProps = {
  hasCancelButton: true,
  confirmButtonText: '按鈕',
  cancelButtonText: '取消',
}

const config = { type: 'danger', size: 'sm' }

function AlertModal(props) {
  const { onClose, onConfirm: propOnConfirm, onCancel: propOnCancel, children, hasCancelButton, confirmButtonText, cancelButtonText } = props
  const { type, size } = config

  const onConfirm = (...params) => {
    onClose()

    if (typeof propOnConfirm === 'function') {
      propOnConfirm(...params)
    }
  }

  const onCancel = (...params) => {
    onClose()

    if (typeof propOnCancel === 'function') {
      propOnCancel(...params)
    }
  }

  return (
    <>
      <Modal.Body padding='24px'>{children}</Modal.Body>
      <Modal.Footer>
        <Button type={type} size={size} isFilled={false} onClick={onConfirm}>
          {confirmButtonText}
        </Button>
        {hasCancelButton && (
          <Button type='default' size={size} onClick={onCancel}>
            {cancelButtonText}
          </Button>
        )}
      </Modal.Footer>
    </>
  )
}

AlertModal.propTypes = propTypes
AlertModal.defaultProps = defaultProps
export default withModal(AlertModal, config)
