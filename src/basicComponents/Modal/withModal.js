import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Modal from '../Modal'

const ModalWithRef = React.forwardRef((props, ref) => <Modal {...props} forwardRef={ref} />)

export function withModal(Component, config = {}) {
  function WithModalComponent({ isOpened: propIsOpened, onClose: propOnClose, modalTitle, headerProps, ...props }) {
    const [isOpened, setIsOpened] = useState(false)

    useEffect(() => {
      setIsOpened(propIsOpened)
    }, [propIsOpened])

    const onClose = (...params) => {
      setIsOpened(false)

      setTimeout(() => {
        if (typeof propOnClose === 'function') {
          propOnClose(...params)
        }
      }, 100)
    }
    const delegationProps = { isOpened, onClose, ...config, ...props }

    return (
      <ModalWithRef {...delegationProps}>
        <Modal.Header {...headerProps} {...config}>
          {modalTitle}
        </Modal.Header>
        <Component {...delegationProps} />
      </ModalWithRef>
    )
  }

  WithModalComponent.propTypes = {
    headerProps: PropTypes.object,
    modalTitle: PropTypes.node,
    isOpened: PropTypes.bool,
    onClose: PropTypes.func,
  }

  return WithModalComponent
}
