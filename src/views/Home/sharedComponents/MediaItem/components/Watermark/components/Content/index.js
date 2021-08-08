import React from 'react'
import styles from './style.module.scss'
import classnames from 'classnames/bind'
import PropTypes from 'prop-types'
import { useGlobalState } from '@/globalState'

// Components

// Lib MISC

// Variables / Functions
const cx = classnames.bind(styles)

export const defaultProps = {
  isDisplay: false,
}

export const propTypes = {
  isDisplay: PropTypes.bool,
  size: PropTypes.number,
  currentTime: PropTypes.string,
}

function Content(props) {
  const { isDisplay, size, currentTime } = props

  const [state] = useGlobalState()
  const { user } = state
  const { userInfo } = user
  const { employeeName, employeeId } = userInfo

  const userInfoText = `TAITRA ${employeeName} [員編：${employeeId}]`

  const infoArray = Array.from({ length: size }, () => userInfoText)
  const timeArray = Array.from({ length: size }, () => currentTime)

  return (
    <div className={cx('media-watermark-wrapper')} data-is-display={isDisplay}>
      <div className={cx('media-watermark__info')}>
        {infoArray.map((info, index) => (
          <p key={index} className={cx('media-watermark-content')}>
            {info}
          </p>
        ))}
      </div>
      <div className={cx('media-watermark__time')}>
        {timeArray.map((time, index) => (
          <p key={index} className={cx('media-watermark-content')}>
            {time}
          </p>
        ))}
      </div>
    </div>
  )
}

Content.defaultProps = defaultProps
Content.propTypes = propTypes

export default Content
