import React, { useEffect, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import styles from './style.module.scss'
import { hot } from 'react-hot-loader/root'

// Lib MISC

// Event handlers
import { useMaintenanceItemListData } from './eventHandler/computedValues/useMaintenanceItemListData'
import getDescriptionText from './eventHandler/methods/getDescriptionText'
import handleUpdateList from './eventHandler/methods/handleUpdateList'

// Components
import { List as AntdList, Collapse as AntdCollapse } from 'antd'
import Icon from '@/basicComponents/Icon'
import CollapseHeaderText from './components/CollapseHeaderText'
import CreateButton from './components/CreateButton'
import EditRow from './components/EditRow'
import ViewRow from './components/ViewRow'

// Style
import 'antd/lib/list/style/css'
import 'antd/lib/collapse/style/css'

// Constants
import { MODE } from './constants'

// API
import { updateMaintenanceItemDelFlag } from '@/api/updateMaintenanceItemDelFlag'
import { updateMaintenanceItemName } from '@/api/updateMaintenanceItemName'
import { updateMaintenanceList } from '@/api/updateMaintenanceList'
import { createMaintenanceItem } from '@/api/createMaintenanceItem'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  categoryId: PropTypes.number,
  categoryName: PropTypes.string,
  isFetched: PropTypes.bool,
}

function MaintenanceList(props) {
  const { categoryId, categoryName, isFetched } = props
  const descriptionText = getDescriptionText(categoryName)

  const [listData, setListData] = useState({})
  const [editRowPointer, setEditRowPointer] = useState(null) // 編輯欄位的指標（指向該欄位的index）
  const [mode, setMode] = useState(MODE.VIEW)
  const isSortingMode = mode === MODE.VIEW

  const { maintenanceItemListData = [], isMaintenanceItemListDataFetched } = useMaintenanceItemListData({ categoryId, all: true }, isFetched)

  const initialRowData = useMemo(() => ({ itemId: null, itemName: '', delFlag: false }), [])

  useEffect(() => {
    if (isMaintenanceItemListDataFetched) setListData({ draft: initialRowData, list: maintenanceItemListData })
  }, [initialRowData, isMaintenanceItemListDataFetched, maintenanceItemListData, setListData])

  // 初始化編輯列的 input 欄位，將原欄位的值帶入
  const initializeInputData = (item, index) => {
    setMode(MODE.EDIT)
    setListData(prevState => ({ ...prevState, draft: { ...item } }))
    setEditRowPointer(index)
  }

  const updateRowData = (values, actions, item, index) => {
    // 判斷「確定」按鈕要呼叫 create 或 update API
    if (mode === MODE.CREATE) {
      createMaintenanceItem({ categoryId, itemName: values.itemName })
    } else {
      // 若 input 裡輸入的內容跟原本不一樣，再call API更新資料，否則不做任何事
      if (values.itemName !== item.itemName) updateMaintenanceItemName({ itemId: values.itemId, itemName: values.itemName })
    }
    const newList = handleUpdateList(listData.list, values, index)
    setListData(prevState => ({ ...prevState, list: newList }))
    setMode(MODE.VIEW)
    setEditRowPointer(null)
  }

  const cancelRowData = (item, index) => {
    // 若欲取消的是新增的欄位，則將此欄資料從 dataList 中移除
    if (index === listData.list.length - 1 && listData.list[index].itemName === '') {
      const newList = [...listData.list]
      newList.pop()
      setListData(prevState => ({ ...prevState, list: newList }))
    }
    setMode(MODE.VIEW)
    setEditRowPointer(null)
  }

  const createRowData = () => {
    setMode(MODE.CREATE)
    const newList = [...listData.list]
    newList.push(initialRowData)
    setListData(prevState => ({ ...prevState, list: newList }))
    setEditRowPointer(newList.length - 1)
  }

  const handleToggleSwitch = (event, item, index) => {
    const newItem = { ...item, delFlag: event }
    const oldList = listData.list
    const newList = handleUpdateList(oldList, newItem, index)
    setListData(prevState => ({ ...prevState, list: newList }))
    const { itemId } = item
    updateMaintenanceItemDelFlag({ itemId, delFlag: event })
  }

  const handleRowSorting = ({ dragRowIndex, hoverRowIndex }) => {
    const { list } = listData
    const newList = [...list]
    const rowDataHolder = newList[dragRowIndex]
    newList[dragRowIndex] = newList[hoverRowIndex]
    newList[hoverRowIndex] = rowDataHolder
    setListData(prevState => ({
      ...prevState,
      list: newList,
    }))
  }

  const handleUpdateMaintenanceList = () => {
    const { list } = listData
    const updateData = []
    list.map((item, index) => {
      updateData.push({ itemId: item.itemId, sorting: index + 1 })
    })
    updateMaintenanceList(updateData)
  }

  return (
    <>
      <AntdCollapse
        className={cx('antd_collapse')}
        defaultActiveKey={['0']}
        expandIcon={({ isActive }) => (
          // 包一層div，為了icon垂直置中用
          <div className={cx('antd_collapse-expand')}>
            <Icon.CaretDown className={cx('antd_collapse-expand-icon')} data-is-active={isActive} />
          </div>
        )}
        expandIconPosition='right'
        style={{ border: 'none' }}
      >
        {/* 因為 ant design 的 collapse 底下的 panel 無法跑 loop，所以目前以每一個 collapse 只有一個 panel，loop整個 collapse 來解決 */}
        <AntdCollapse.Panel
          key='0'
          header={
            <div style={{ display: 'flex' }}>
              <CollapseHeaderText title={categoryName} description={descriptionText} />
            </div>
          }
          style={{ border: 'none' }}
          disabled
        >
          <AntdList
            bordered={false}
            dataSource={listData.list}
            footer={<CreateButton onClick={createRowData} disabled={[MODE.EDIT, MODE.CREATE].includes(mode)} />}
            renderItem={(item, index) => (
              <AntdList.Item className={cx('maintenance-list_item')} style={{ padding: 0 }}>
                {index === editRowPointer ? (
                  <EditRow item={item} index={index} categoryName={categoryName} updateRowData={updateRowData} cancelRowData={cancelRowData} />
                ) : (
                  <ViewRow
                    item={item}
                    index={index}
                    mode={mode}
                    handleToggleSwitch={handleToggleSwitch}
                    initializeInputData={initializeInputData}
                    handleRowSorting={handleRowSorting}
                    isSortingMode={isSortingMode}
                    handleUpdateMaintenanceList={handleUpdateMaintenanceList}
                  />
                )}
              </AntdList.Item>
            )}
          />
        </AntdCollapse.Panel>
      </AntdCollapse>
    </>
  )
}

MaintenanceList.propTypes = propTypes

export default hot(MaintenanceList)
