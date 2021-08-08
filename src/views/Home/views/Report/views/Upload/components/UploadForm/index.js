import React from 'react'
import classnames from 'classnames/bind'
import styles from './style.module.scss'
import { useFormikContext } from 'formik'
import { withRouter } from 'react-router-dom'
// import PropTypes from 'prop-types'

// Components
import Layout from '@/basicComponents/Layout'
import Panel from '@/basicComponents/Panel'
import Table from '@/basicComponents/Table'
import UploadFilter from './components/UploadFilter'
import UploadButton from './components/UploadButton'
import UploadAmount from './components/UploadAmount'
import Icon from '@/basicComponents/Icon'

// Lib MISC
import { useOrganizationOptions } from '@/views/Home/eventHandler/shareComputedValues/useOrganizationOptions'
import { useReportUploadData } from '../../eventHandler/computedValues/useReportUploadData'
import { onSortClick } from './eventHandler/methods/onSortClick'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {}

const SORT_BY = {
  LASTDATE: 'lastDate',
}

function UploadForm(props) {
  const { values, setFieldValue, submitForm } = useFormikContext()
  const { organizationOptions } = useOrganizationOptions()

  const { reportData, isReportUploadDataFetched } = useReportUploadData(values)
  const { reportList, eventAmount, imageAmount, videoAmount } = reportData
  const { sortBy, isDescending } = values

  const containerWidth = window.innerWidth - 150

  return (
    <Layout className={cx('upload')}>
      <Panel className={cx('upload-panel')}>
        <div className={cx('upload-bar')}>
          <UploadFilter organizationOptions={organizationOptions} />
          <UploadAmount eventAmount={eventAmount} imageAmount={imageAmount} videoAmount={videoAmount} />
          <UploadButton onExcelEmportClick={() => submitForm()} />
        </div>
        <Table
          className={cx('upload-table')}
          style={{ marginTop: 16 }}
          loading={!isReportUploadDataFetched}
          data={reportList}
          noDataIcon={<Icon.NoReport />}
          noDataText='系統無任何資料'
          pageSize={reportList.length || 10}
          columns={[
            {
              id: 'no',
              Header: <Table.Title title='序號' />,
              accessor: 'no',
              headerStyle: { textAlign: 'left' },
              width: Math.round(containerWidth * (8.7 / 100)),
            },
            {
              Header: <Table.Title title='所屬單位' />,
              accessor: 'organization.departmentName',
              headerStyle: { textAlign: 'left' },
              width: Math.round(containerWidth * (11.8 / 100)),
            },
            {
              id: 'creator',
              Header: <Table.Title title='上傳者[員編]' />,
              accessor: item => `${item.organization.teamName || ''} ${item.createdUser.employeeName} [員編 : ${item.createdUser.employeeId}]`,
              headerStyle: { textAlign: 'left' },
              width: Math.round(containerWidth * (18.3 / 100)),
            },
            {
              id: 'eventName',
              Header: <Table.Title title='活動名稱' />,
              accessor: item => `${item.eventYear}年 ${item.eventName}`,
              headerStyle: { textAlign: 'left' },
              width: Math.round(containerWidth * (29.9 / 100)),
            },
            {
              Header: <Table.Title title='照片數量' />,
              accessor: 'imageAmount',
              headerStyle: { textAlign: 'left' },
              width: Math.round(containerWidth * (8 / 100)),
            },
            {
              Header: <Table.Title title='影片數量' />,
              accessor: 'videoAmount',
              headerStyle: { textAlign: 'left' },
              width: Math.round(containerWidth * (8 / 100)),
            },
            {
              Header: (
                <Table.Title
                  title='最後送存時間'
                  name={SORT_BY.LASTDATE}
                  hasSort
                  onSortClick={event => onSortClick(event, sortBy, isDescending, setFieldValue)}
                  sortBy={sortBy}
                  isDescending={isDescending}
                />
              ),
              accessor: 'lastDate',
              headerStyle: { textAlign: 'left' },
              width: Math.round(containerWidth * (12.7 / 100)),
            },
          ]}
        />
      </Panel>
    </Layout>
  )
}

UploadForm.propTypes = propTypes

export default withRouter(UploadForm)
