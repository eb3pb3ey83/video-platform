import React from 'react'
import styles from './style.module.scss'
import classnames from 'classnames/bind'
import PropTypes from 'prop-types'

// Components
import Content from './components/Content'

// Lib MISC

// Variables / Functions
const cx = classnames.bind(styles)

export const defaultProps = {
  currentMediaId: 0,
}

export const propTypes = {
  isDisplay: PropTypes.bool,
  size: PropTypes.number,
  currentMediaId: PropTypes.number,
  currentTime: PropTypes.string,
}

function Watermark(props) {
  const { isDisplay, size, currentMediaId, currentTime } = props

  const contentArray = Array.from({ length: size }, (v, index) => index)

  return (
    <div id={`watermark-${currentMediaId}`} className={cx('media-watermark')}>
      {contentArray.map((item, index) => (
        <Content key={index} size={size} isDisplay={isDisplay} currentTime={currentTime} />
      ))}
    </div>
  )
}

Watermark.defaultProps = defaultProps
Watermark.propTypes = propTypes

export default Watermark
