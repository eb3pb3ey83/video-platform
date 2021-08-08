import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Style
import styles from './style.module.scss'

const cx = classnames.bind(styles)

export const propTypes = {
  completed: (props, propName) => {
    if (typeof props[propName] !== 'number') {
      return console.error('Invalid Props: "completed" should be number')
    }
    if (props[propName] < 0 || props[propName] > 100) {
      return console.error('Invalid Props: "completed" should be between 0 and 100')
    }
  },
  color: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  animation: PropTypes.number,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export const defaultProps = {
  completed: 0,
  color: '#2a69c7',
  animation: 200,
  height: 6,
}

function ProgressBar(props) {
  const { color, completed, animation, height, className, children, ...rest } = props

  const style = {
    backgroundColor: color,
    width: completed + '%',
    transition: `width ${animation}ms`,
    height,
  }

  const isCompleted = completed === 100 // 上傳/下載完成

  return (
    <>
      {!isCompleted && (
        <div className={cx('progressbar-container')} {...rest}>
          <div className={cx('progressbar-progress', className)} style={style}>
            {children}
          </div>
        </div>
      )}
    </>
  )
}

ProgressBar.propTypes = propTypes
ProgressBar.defaultProps = defaultProps

export default ProgressBar
