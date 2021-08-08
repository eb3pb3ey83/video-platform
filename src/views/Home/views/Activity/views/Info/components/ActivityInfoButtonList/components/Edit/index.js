import React from 'react'
import styles from './style.module.scss'
import classnames from 'classnames/bind'
import PropTypes from 'prop-types'

// Components
import Button from '@/basicComponents/Button'
import ActivityInfoColumn from '../../../../sharedComponents/ActivityInfoColumn'
// Lib MISC

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  onModeChange: PropTypes.func,
}

function Edit(props) {
  const { onModeChange } = props

  return (
    <ActivityInfoColumn>
      <Button onClick={onModeChange} isBlock className={cx('activity-info__button')} size='sm' type='default' htmlType='button'>
        取消
      </Button>
      <Button isBlock className={cx('activity-info__button')} size='sm' type='primary' htmlType='submit'>
        確定變更
      </Button>
    </ActivityInfoColumn>
  )
}

Edit.propTypes = propTypes

export default Edit
