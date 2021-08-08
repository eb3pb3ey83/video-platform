import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components

// Style
import styles from './style.module.scss'

// Lib MISC

// Variables / Functions
const cx = classnames.bind(styles)

export const defaultProps = {
  eventAmount: 0,
  imageAmount: 0,
  videoAmount: 0,
}

export const propTypes = {
  eventAmount: PropTypes.number,
  imageAmount: PropTypes.number,
  videoAmount: PropTypes.number,
}

function UploadAmount(props) {
  const { eventAmount, imageAmount, videoAmount } = props

  return (
    <div className={cx('upload-amount')}>
      <p className={cx('upload-amount__title')}>總計 :</p>
      <p className={cx('upload-amount__number')}>{eventAmount.toLocaleString()}</p>
      <p className={cx('upload-amount__text')}>活動</p>
      <p className={cx('upload-amount__number')}>{imageAmount.toLocaleString()}</p>
      <p className={cx('upload-amount__text')}>照片</p>
      <p className={cx('upload-amount__number')}>{videoAmount.toLocaleString()}</p>
      <p className={cx('upload-amount__text')}>影片</p>
    </div>
  )
}

UploadAmount.propTypes = propTypes

export default UploadAmount
