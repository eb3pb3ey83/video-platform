import React from 'react'
import styles from './style.module.scss'
import classnames from 'classnames/bind'
import PropTypes from 'prop-types'

// Components

// Lib MISC

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  isOpened: PropTypes.bool,
  eventName: PropTypes.string,
  departmentName: PropTypes.string,
  description: PropTypes.string,
}

function Detail(props) {
  const { isOpened, eventName, departmentName, description } = props

  return (
    <div className={cx('media-detail-wrapper')} data-is-opened={isOpened}>
      <p className={cx('media-detail__name')}>{eventName}</p>
      <p className={cx('media-detail__department')}>{departmentName}</p>
      <p className={cx('media-detail__description')}>{description}</p>
    </div>
  )
}

Detail.propTypes = propTypes

export default Detail
