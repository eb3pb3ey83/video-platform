import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import styles from './style.module.scss'
import { useDrag, useDrop } from 'react-dnd'

// Components
import { Switch as AntdSwitch } from 'antd'
import Typography from '@/basicComponents/Typography'
import EditButton from './components/EditButton'
import Icon from '@/basicComponents/Icon'

// Style
import 'antd/lib/switch/style/css'

// Lib MISC

// Constants
import { MODE, ITEM_TYPES } from '../../constants'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  handleToggleSwitch: PropTypes.func,
  initializeInputData: PropTypes.func,
  mode: PropTypes.number,
  handleRowSorting: PropTypes.func,
  isSortingMode: PropTypes.bool,
  handleUpdateMaintenanceList: PropTypes.func,
}

function ViewRow(props) {
  const { item, index, handleToggleSwitch, initializeInputData, mode, handleRowSorting, isSortingMode, handleUpdateMaintenanceList } = props

  const rowRef = useRef(null)

  const [, drag, preview] = useDrag({
    item: {
      type: ITEM_TYPES.ROW_ITEM,
      rowIndex: index,
      item: item,
    },
    canDrag: isSortingMode,
    isDragging: monitor => {
      const dragIndex = index
      const dropIndex = monitor.getItem().rowIndex
      return dragIndex === dropIndex
    },
    end: (item, monitor) => {
      handleUpdateMaintenanceList()
    },
    collect: monitor => ({
      canDrag: Boolean(monitor.canDrag()),
      isDragging: Boolean(monitor.isDragging()),
      didDrop: Boolean(monitor.didDrop()),
    }),
  })

  const [collectedDropProps, drop] = useDrop({
    accept: ITEM_TYPES.ROW_ITEM,
    hover: (item, monitor) => {
      // 異常處理判斷
      if (!rowRef.current) return
      if (!monitor.canDrop()) return

      // 拖拽目標的Index
      const dragRowIndex = item.rowIndex

      // 放置目標Index
      const hoverRowIndex = index

      // 如果拖拽目標和放置目標相同的話，停止執行
      if (dragRowIndex === hoverRowIndex) return {}

      // 執行交換位置的方法
      handleRowSorting({ dragRowIndex, hoverRowIndex })
      item.rowIndex = hoverRowIndex
    },
    collect: monitor => ({
      isOver: Boolean(monitor.isOver()),
      canDrop: Boolean(monitor.canDrop()),
    }),
  })

  const { isOver } = collectedDropProps

  return (
    <div className={cx('view_row-wrapper')}>
      <div className={cx('view_row-index')}>{index + 1}.&nbsp;</div>
      <div className={cx('view_row')} ref={preview(drop(rowRef))} data-is-over={isOver} data-can-drag={isSortingMode}>
        <div className={cx('view_row-title')}>{item.itemName}</div>
        <div className={cx('view_row-buttons')}>
          <div>
            <AntdSwitch
              className={cx('antd_switch')}
              data-is-closed={item.delFlag}
              onClick={event => handleToggleSwitch(event, item, index)}
              defaultChecked={item.delFlag}
              disabled={[MODE.EDIT, MODE.CREATE].includes(mode)}
            />
            <Typography.Text level='h5' lineHeight={2} color={item.delFlag || [MODE.EDIT, MODE.CREATE].includes(mode) ? 'gray-darker' : 'primary'}>
              {item.delFlag ? '停用' : '啟用'}
            </Typography.Text>
          </div>
          <EditButton onClick={event => initializeInputData(item, index)} disabled={[MODE.EDIT, MODE.CREATE].includes(mode)} />
          {/* 因為 React DnD 的 drag 無法將拖曳 ref 綁定在 svg tag 上，所以包一層 div 來綁定拖曳 ref */}
          <div className={cx('view_row-drag_wrapper')} ref={drag}>
            <Icon.Drag className={cx('view_row-drag_icon')} data-can-drag={isSortingMode} />
          </div>
        </div>
      </div>
    </div>
  )
}

ViewRow.propTypes = propTypes

export default ViewRow
