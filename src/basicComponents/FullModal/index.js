import React from 'react'
import PropTypes from 'prop-types'

// Components
import OverPageWithTitle from './components/OverPageWithTitle'
import Icon from '@/basicComponents/Icon'

// Lib MISC

// Variables / Functions

export const propTypes = {
  children: PropTypes.func,
  isShowBackButton: PropTypes.bool,
}

function FullModal(props) {
  const { children, isShowBackButton, ...restProps } = props

  const closeButtonProps = {
    ...(isShowBackButton && {
      closeButtonPosition: { left: 20, right: 'auto' },
      closeIcon: <Icon.Back />,
    }),
  }

  return (
    <OverPageWithTitle {...closeButtonProps} {...restProps}>
      {children}
    </OverPageWithTitle>
  )
}

FullModal.propTypes = propTypes

export default FullModal
