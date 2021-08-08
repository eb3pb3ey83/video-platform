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

function ViewAmount(props) {
  const { totalAmount } = props

  return (
    <div className={cx('view-amount')}>
      <p className={cx('view-amount__title')}>總計 :</p>
      <p className={cx('view-amount__number')}>{totalAmount.toLocaleString()}</p>
      <p className={cx('view-amount__text')}>瀏覽次數</p>
    </div>
  )
}

ViewAmount.propTypes = propTypes

export default ViewAmount
