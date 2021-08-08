import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components

// Style
import styles from './style.module.scss'

// Lib MISC

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  totalAmount: PropTypes.number,
}

function DownloadAmount(props) {
  const { totalAmount } = props

  return (
    <div className={cx('download-amount')}>
      <p className={cx('download-amount__title')}>總計 :</p>
      <p className={cx('download-amount__number')}>{totalAmount.toLocaleString()}</p>
      <p className={cx('download-amount__text')}>下載次數</p>
    </div>
  )
}

DownloadAmount.propTypes = propTypes

export default DownloadAmount
