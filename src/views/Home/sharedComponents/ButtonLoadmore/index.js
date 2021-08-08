import React from 'react'
import styles from './style.module.scss'
import classnames from 'classnames/bind'
import PropTypes from 'prop-types'

// Components
import Button from '@/basicComponents/Button'

// Lib MISC

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  hasMore: PropTypes.bool,
  onLoadMoreClick: PropTypes.func,
}

const defaultProps = {
  hasMore: false,
  onLoadMoreClick: () => {},
}

function ButtonLoadmore(props) {
  const { hasMore, onLoadMoreClick } = props

  return (
    <>
      {hasMore && (
        <div className={cx('button-loadmore')}>
          <Button size='sm' isBlock htmlType='button' onClick={onLoadMoreClick}>
            載入更多
          </Button>
        </div>
      )}
    </>
  )
}

ButtonLoadmore.propTypes = propTypes
ButtonLoadmore.defaultProps = defaultProps

export default ButtonLoadmore
