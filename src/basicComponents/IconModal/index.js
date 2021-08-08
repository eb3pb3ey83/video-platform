import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import styles from './style.module.scss'

// Components
import Modal from '@/basicComponents/Modal'
import Typography from '@/basicComponents/Typography'

// Lib MISC

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  icon: PropTypes.node,
  description: PropTypes.string,
  isOpened: PropTypes.bool,
}

function IconModal(props) {
  const { icon, description, isOpened } = props
  return (
    <>
      <Modal isClosable={false} isOpened={isOpened} size='xs'>
        <Modal.Body padding='30px' style={{ flexDirection: 'column', alignItems: 'center', alignContent: 'center' }}>
          <div className={cx('modal-body__icon')}>{icon && icon}</div>
          <div className={cx('modal-body__description')}>
            {description && (
              <Typography.Text color='gray-dark' size='xs' marginTop={16}>
                {description}
              </Typography.Text>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

IconModal.propTypes = propTypes

export default IconModal
