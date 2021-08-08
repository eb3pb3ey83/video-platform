import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Button from '@/basicComponents/Button'
import Icon from '@/basicComponents/Icon'
import Dropdown from '@/basicComponents/Dropdown'
import Menu from '@/basicComponents/Menu'

// Style
import styles from './style.module.scss'

// Lib MISC

// Variables / Functions
import { EXPORT_TYPE } from '../../../../../../shareConstants/EXPORT_TYPE'
const cx = classnames.bind(styles)

export const propTypes = {
  className: PropTypes.string,
  onExcelExportClick: PropTypes.func,
}

function ViewButton(props) {
  const { className, onExcelExportClick } = props

  return (
    <div className={cx('view-button-wrapper', className)}>
      <Dropdown.Button
        className={cx('view-button')}
        type='primary'
        size='sm'
        prefix={<Icon.Export />}
        isView
        content={
          <Menu type='primary' shape='radius' padding='6px 0' elementType='div'>
            <Button.Group direction='vertical' size='sm' shape='rect' isBlock>
              <Button
                type='primary'
                align='flex-start'
                onClick={event => {
                  onExcelExportClick(EXPORT_TYPE.NORMAL)
                }}
              >
                瀏覽次數統計
              </Button>
              <Button
                type='primary'
                align='flex-start'
                onClick={event => {
                  onExcelExportClick(EXPORT_TYPE.DETAIL)
                }}
              >
                瀏覽詳細記錄
              </Button>
            </Button.Group>
          </Menu>
        }
      >
        匯出Excel檔
      </Dropdown.Button>
    </div>
  )
}

ViewButton.propTypes = propTypes

export default ViewButton
