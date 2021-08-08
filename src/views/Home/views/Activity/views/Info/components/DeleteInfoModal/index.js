import React from 'react'
import PropTypes from 'prop-types'
import { useFormikContext } from 'formik'
import classnames from 'classnames/bind'
import styles from './style.module.scss'

// Components
import Icon from '@/basicComponents/Icon'
import Typography from '@/basicComponents/Typography'
import AlertModal from '@/basicComponents/AlertModal'

// Lib MISC

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  eventName: PropTypes.string,
  isOpened: PropTypes.bool,
  onConfirm: PropTypes.func,
  onClose: PropTypes.func,
}

function DeleteInfoModal(props) {
  const { isOpened, onConfirm, onClose, eventName } = props
  const { values } = useFormikContext()
  const { imageAmount, videoAmount } = values

  return (
    <>
      <AlertModal
        size='md'
        isOpened={isOpened}
        onConfirm={onConfirm}
        onClose={onClose}
        modalTitle={
          <>
            <Icon.Alert />
            <Typography.Text size='lg' marginLeft={8}>
              確認刪除活動
            </Typography.Text>
          </>
        }
        confirmButtonText='刪除'
      >
        <div className={cx('delete-info-modal-content__title')}>確定刪除 『{eventName}？』</div>
        <div className={cx('delete-info-modal-content__notice')}>． 經確認刪除後，該活動相關照片及影片等媒體資訊也會一併刪除！</div>
        <div className={cx('delete-info-modal-content__notice')}>． 活動刪除後，將無法再重新復原！</div>
        <div className={cx('delete-info-modal-content__title')}>此活動含有:</div>
        <div>
          <span className={cx('delete-info-modal-content__count')}>{videoAmount}</span>
          <span className={cx('delete-info-modal-content__type')}>影片</span>
          <span className={cx('delete-info-modal-content__count')}>{imageAmount}</span>
          <span className={cx('delete-info-modal-content__type')}>照片</span>
        </div>
      </AlertModal>
    </>
  )
}

DeleteInfoModal.propTypes = propTypes

export default DeleteInfoModal
