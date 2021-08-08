import React from 'react'
import classnames from 'classnames/bind'
import styles from './style.module.scss'
import { useFormikContext } from 'formik'
import { withRouter } from 'react-router-dom'

// Components
import Layout from '@/basicComponents/Layout'
import Panel from '@/basicComponents/Panel'
import Table from '@/basicComponents/Table'
import ViewFilter from './components/ViewFilter'
import ViewButton from './components/ViewButton'
import ViewAmount from './components/ViewAmount'
import Icon from '@/basicComponents/Icon'

// Lib MISC
import { useReportViewData } from '../../eventHandler/computedValues/useReportViewData'
import { useExpandedChange } from '../../../../eventHandler/shareMethods/useExpandedChange'
import { onExcelExportClick } from '../../../../eventHandler/shareMethods/onExcelExportClick'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {}

const subComponent = row => {
  const detail = row.original.detail

  return (
    <>
      <Table
        className={cx('view-table--sub')}
        data={detail}
        pageSize={detail.length}
        columns={[
          {
            Header: <Table.Title title='瀏覽單位' />,
            accessor: 'organization.departmentName',
            headerStyle: { textAlign: 'left' },
            width: 1074,
          },
          {
            Header: <Table.Title title='瀏覽次數統計' />,
            accessor: 'totalAmount',
            headerStyle: { textAlign: 'left' },
            width: 133,
          },
        ]}
      />
    </>
  )
}

function ViewForm(props) {
  const { values, setFieldValue, submitForm } = useFormikContext()

  const { viewData, isReportViewDataFetched } = useReportViewData(values)
  const { viewList, totalAmount } = viewData

  const { handleExpandTable, expanded } = useExpandedChange()

  return (
    <Layout className={cx('view')}>
      <Panel className={cx('view-panel')}>
        <div className={cx('view-bar')}>
          <ViewFilter />
          <ViewAmount totalAmount={totalAmount} />
          <ViewButton onExcelExportClick={exportType => onExcelExportClick(setFieldValue, submitForm, exportType)} />
        </div>
        <Table
          className={cx('view-table')}
          style={{ marginTop: 16 }}
          loading={!isReportViewDataFetched}
          data={viewList}
          noDataIcon={<Icon.NoReport />}
          noDataText='系統無任何資料'
          pageSize={viewList.length || 8}
          SubComponent={viewList.length === 0 ? null : subComponent}
          expandedRows
          expanded={expanded}
          onExpandedChange={(newExpanded, index, event, row) => handleExpandTable(index)}
          columns={[
            {
              id: 'no',
              Header: <Table.Title title='序號' />,
              accessor: 'no',
              headerStyle: { textAlign: 'left' },
              width: 127,
            },
            {
              id: 'eventName',
              Header: <Table.Title title='活動名稱' />,
              accessor: item => `${item.eventYear}年 ${item.eventName}`,
              headerStyle: { textAlign: 'left' },
              width: 585,
            },
            {
              Header: <Table.Title title='照片瀏覽次數' />,
              accessor: 'imageAmount',
              headerStyle: { textAlign: 'left' },
              width: 177,
            },
            {
              Header: <Table.Title title='影片瀏覽次數' />,
              accessor: 'videoAmount',
              headerStyle: { textAlign: 'left' },
              width: 179,
            },
            {
              Header: <Table.Title title='瀏覽次數統計' />,
              accessor: 'totalAmount',
              headerStyle: { textAlign: 'left' },
              width: 184,
            },
          ]}
        />
      </Panel>
    </Layout>
  )
}

ViewForm.propTypes = propTypes

export default withRouter(ViewForm)
