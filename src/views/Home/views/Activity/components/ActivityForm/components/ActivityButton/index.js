import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Button from '@/basicComponents/Button'
import Icon from '@/basicComponents/Icon'

// Style
import styles from './style.module.scss'

// Lib MISC
import { getCurrentUserRole } from '@/utils/getUserInfo'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  className: PropTypes.string,
  onExcelImportClick: PropTypes.func,
  onAddActivityClick: PropTypes.func,
}

function ActivityButton(props) {
  const { className, onExcelImportClick, onAddActivityClick } = props
  const userRole = getCurrentUserRole()

  return (
    <div className={cx('acitvity-button-wrapper', className)}>
      {userRole.isHighestRole && (
        <Button className={cx('acitvity-button')} size='sm' type='default' htmlType='button' prefix={<Icon.Import />} onClick={onExcelImportClick}>
          Excel匯入
        </Button>
      )}
      <Button
        className={cx('acitvity-button')}
        size='sm'
        type='primary'
        htmlType='button'
        prefix={<Icon.Add fill='#fff' />}
        onClick={onAddActivityClick}
      >
        新增活動
      </Button>
    </div>
  )
}

ActivityButton.propTypes = propTypes

export default ActivityButton
