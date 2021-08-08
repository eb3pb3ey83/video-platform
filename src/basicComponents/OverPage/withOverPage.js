import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import OverPage from '../OverPage'

const OverPageWithRef = React.forwardRef((props, ref) => <OverPage {...props} forwardRef={ref} />)

export function withOverPage(Component, config = {}) {
  const restConfig = config

  function WithOverPageComponent({
    children,
    ConfirmationAlert,
    shouldConfirmBeforeClose,
    isOpened: propIsOpened,
    onClose: propOnClose,
    onConfirm: propOnConfirm,
    confirmTitle,
    confirmText,
    ...props
  }) {
    const [isOpened, setIsOpened] = useState(false)
    const [shouldCloseOverPage, setShouldCloseOverPage] = useState(false)
    const [confirmationCallback, setConfirmationCallback] = useState(() => null)
    const [isConfirmationOpened, setIsConfirmationOpened] = useState(false)

    const openConfirmation = callback => {
      setIsConfirmationOpened(true)
      setShouldCloseOverPage(false)
      setConfirmationCallback(() => callback)
    }

    useEffect(() => setIsOpened(propIsOpened), [propIsOpened])

    const close = (...params) => {
      setIsOpened(false)
      setTimeout(() => {
        if (typeof propOnClose === 'function') {
          propOnClose(...params)
        }
      }, 100)
    }

    const onConfirm = (...params) => {
      setIsConfirmationOpened(false)

      if (typeof propOnConfirm === 'function') {
        propOnConfirm(...params)
      }

      if (typeof confirmationCallback === 'function') {
        confirmationCallback()
        setConfirmationCallback(() => null)
      }

      if (shouldCloseOverPage) {
        close(...params)
      }
    }

    const onOverPageClose = (...params) => {
      if (shouldConfirmBeforeClose && !ConfirmationAlert) throw new Error('Please provide confirmation component.')
      if (shouldConfirmBeforeClose && !isConfirmationOpened) {
        setIsConfirmationOpened(true)
        setShouldCloseOverPage(true)
        return
      }

      close(...params)
    }

    const delegationProps = { isOpened, onClose: onOverPageClose, close, ...restConfig, ...props }

    return (
      <OverPageWithRef {...delegationProps}>
        {ConfirmationAlert && (
          <ConfirmationAlert
            isOpened={isConfirmationOpened}
            onClose={() => setIsConfirmationOpened(false)}
            onConfirm={onConfirm}
            confirmTitle={confirmTitle}
            confirmText={confirmText}
          />
        )}
        <Component {...delegationProps}>{children(openConfirmation)}</Component>
      </OverPageWithRef>
    )
  }

  WithOverPageComponent.propTypes = {
    isOpened: PropTypes.bool,
    shouldConfirmBeforeClose: PropTypes.bool,
    children: PropTypes.func,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func,
    ConfirmationAlert: PropTypes.func,
    confirmTitle: PropTypes.string,
    confirmText: PropTypes.string,
  }

  return WithOverPageComponent
}
