import React from 'react'
import { hot } from 'react-hot-loader/root'
import classnames from 'classnames/bind'
import styles from './style.module.scss'

// Components
import MaintenanceList from './components/MaintenanceList'
import Panel from '@/basicComponents/Panel'
import Typography from '@/basicComponents/Typography'
import Layout from '@/basicComponents/Layout'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

// Lib MISC
import { useMaintenanceCategoryListData } from './eventHandler/computedValues/useMaintenanceCategoryListData'

// Style
import 'antd/lib/collapse/style/css'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {}

function Maintenance(props) {
  const { maintenanceCategoryListData, isMaintenanceCategoryListDataFetched } = useMaintenanceCategoryListData()

  return (
    <>
      <DndProvider backend={Backend}>
        <Layout className={cx('maintenance')}>
          <Panel className={cx('maintenance-panel')}>
            <Typography.Title level='h5' lineHeight={2} color='gray-darker'>
              維護項目
            </Typography.Title>
            {isMaintenanceCategoryListDataFetched &&
              maintenanceCategoryListData.map(item => {
                const { categoryId, categoryName } = item
                return (
                  <MaintenanceList
                    key={`${categoryId}_${categoryName}`}
                    categoryId={categoryId}
                    categoryName={categoryName}
                    isFetched={isMaintenanceCategoryListDataFetched}
                  />
                )
              })}
          </Panel>
        </Layout>
      </DndProvider>
    </>
  )
}

Maintenance.propTypes = propTypes

export default hot(Maintenance)
