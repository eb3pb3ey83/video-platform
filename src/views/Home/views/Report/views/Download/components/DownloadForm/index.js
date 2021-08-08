import React from 'react'
import classnames from 'classnames/bind'
import styles from './style.module.scss'
import { useFormikContext } from 'formik'
import { withRouter } from 'react-router-dom'

// Components
import Layout from '@/basicComponents/Layout'
import Panel from '@/basicComponents/Panel'
import Table from '@/basicComponents/Table'
import DownloadFilter from './components/DownloadFilter'
import DownloadButton from './components/DownloadButton'
import DownloadAmount from './components/DownloadAmount'
import Icon from '@/basicComponents/Icon'

// Lib MISC
import { useReportDownloadData } from '../../eventHandler/computedValues/useReportDownloadData'
import { useExpandedChange } from '../../../../eventHandler/shareMethods/useExpandedChange'
import { onExcelExportClick } from '../../../../eventHandler/shareMethods/onExcelExportClick'

// Variables / Functions
import { ACCESS_AUTHORITY } from '@/constants/ACCESS_AUTHORITY'
const cx = classnames.bind(styles)

export const propTypes = {}

const subComponent = row => {
  const detail = row.original.detail

  return (
    <>
      <Table
        className={cx('download-table--sub')}
        data={detail}
        pageSize={detail.length}
        columns={[
          {
            Header: <Table.Title title='媒體編號' />,
            accessor: 'attachmentId',
            headerStyle: { textAlign: 'left' },
            width: 131,
          },
          {
            id: 'totalAmount',
            Header: <Table.Title title='格式' />,
            accessor: item => `${item.video ? '影片' : '照片'}`,
            headerStyle: { textAlign: 'left' },
            width: 188,
          },
          {
            id: 'accessAuthority',
            Header: <Table.Title title='狀態' />,
            accessor: item => `${item.accessAuthority === ACCESS_AUTHORITY.PUBLIC ? '公開' : '不公開'}`,
            headerStyle: { textAlign: 'left' },
            width: 177,
          },
          {
            Header: <Table.Title title='下載者單位' />,
            accessor: 'organization.departmentName',
            headerStyle: { textAlign: 'left' },
            width: 228,
          },
          {
            id: 'downloadUser',
            Header: <Table.Title title='下載者[員編]' />,
            accessor: item => `${item.downloadUser.employeeName} [員編 : ${item.downloadUser.employeeId}]`,
            headerStyle: { textAlign: 'left' },
            width: 188,
          },
          {
            Header: <Table.Title title='最後下載時間' />,
            accessor: 'lastDate',
            headerStyle: { textAlign: 'left' },
            width: 188,
          },
          {
            Header: <Table.Title title='下載次數' />,
            accessor: 'downloadAmount',
            headerStyle: { textAlign: 'left' },
            width: 186,
          },
        ]}
      />
    </>
  )
}

function DownloadForm(props) {
  const { values, setFieldValue, submitForm } = useFormikContext()

  const { downloadData, isReportDownloadDataFetched } = useReportDownloadData(values)
  const { downloadList, totalAmount } = downloadData

  const { handleExpandTable, expanded } = useExpandedChange()

  return (
    <Layout className={cx('download')}>
      <Panel className={cx('download-panel')}>
        <div className={cx('download-bar')}>
          <DownloadFilter />
          <DownloadAmount totalAmount={totalAmount} />
          <DownloadButton onExcelExportClick={exportType => onExcelExportClick(setFieldValue, submitForm, exportType)} />
        </div>
        <Table
          className={cx('download-table')}
          style={{ marginTop: 16 }}
          loading={!isReportDownloadDataFetched}
          data={downloadList}
          noDataIcon={<Icon.NoReport />}
          noDataText='系統無任何資料'
          pageSize={downloadList.length || 8}
          SubComponent={downloadList.length === 0 ? null : subComponent}
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
              width: 595,
            },
            {
              Header: <Table.Title title='照片下載次數' />,
              accessor: 'imageAmount',
              headerStyle: { textAlign: 'left' },
              width: 187,
            },
            {
              Header: <Table.Title title='影片下載次數' />,
              accessor: 'videoAmount',
              headerStyle: { textAlign: 'left' },
              width: 189,
            },
            {
              Header: <Table.Title title='下載次數總計' />,
              accessor: 'totalAmount',
              headerStyle: { textAlign: 'left' },
              width: 194,
            },
          ]}
        />
      </Panel>
    </Layout>
  )
}

DownloadForm.propTypes = propTypes

export default withRouter(DownloadForm)
