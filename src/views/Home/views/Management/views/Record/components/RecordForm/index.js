import React from 'react'
import classnames from 'classnames/bind'
import styles from './style.module.scss'
import { useFormikContext } from 'formik'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

// Components
import Layout from '@/basicComponents/Layout'
import Panel from '@/basicComponents/Panel'
import Table from '@/basicComponents/Table'
import RecordFilter from './components/RecordFilter'
import RecordButton from './components/RecordButton'
import Icon from '@/basicComponents/Icon'
import NoEventIdText from '../../../../shareComponents/NoEventIdText'
import NoEventNameText from '../../../../shareComponents/NoEventNameText'

// Lib MISC
import { useManagementRecordData } from '../../eventHandler/computedValues/useManagementRecordData'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  history: PropTypes.object,
}

function RecordForm(props) {
  const { history } = props
  const { values } = useFormikContext()

  const { recordData, isManagementRecordDataFetched } = useManagementRecordData(values)
  const { recordList } = recordData

  return (
    <Layout className={cx('record')}>
      <Panel className={cx('record-panel')}>
        <div className={cx('record-bar')}>
          <RecordFilter />
          <RecordButton onClick={() => history.push('record/permissionCreator')} />
        </div>
        <Table
          style={{ marginTop: 16 }}
          loading={!isManagementRecordDataFetched}
          data={recordList}
          noDataIcon={<Icon.NoReport />}
          noDataText='系統無任何資料'
          pageSize={recordList.length || 10}
          columns={[
            {
              Header: <Table.Title title='申請編號' />,
              accessor: 'recordId',
              headerStyle: { textAlign: 'left' },
              width: 100,
            },
            {
              id: 'organization.departmentName',
              Header: <Table.Title title='單位' />,
              accessor: 'organization.departmentName',
              headerStyle: { textAlign: 'left' },
              width: 149,
            },
            {
              id: 'applicant',
              Header: <Table.Title title='申請者[員編]' />,
              accessor: item => `${item.applicant.employeeName} [員編 : ${item.applicant.employeeId}]`,
              headerStyle: { textAlign: 'left' },
              width: 186,
            },
            {
              id: 'eventId',
              Header: <Table.Title title='活動編號' />,
              accessor: item => item.eventId || <NoEventIdText />,
              headerStyle: { textAlign: 'left' },
              width: 101,
            },
            {
              id: 'eventName',
              Header: <Table.Title title='活動名稱' />,
              accessor: item => (item.eventName ? `${item.eventYear}年 ${item.eventName}` : <NoEventNameText />),
              headerStyle: { textAlign: 'left' },
              width: 336,
            },
            {
              Header: <Table.Title title='申請時間' />,
              accessor: 'createdDate',
              headerStyle: { textAlign: 'left' },
              width: 119,
            },
            {
              id: 'downloadTime',
              Header: <Table.Title title='可下載時間' />,
              accessor: item => `${item.startDate}-${item.endDate}`,
              headerStyle: { textAlign: 'left' },
              width: 225,
            },
          ]}
        />
      </Panel>
    </Layout>
  )
}

RecordForm.propTypes = propTypes

export default withRouter(RecordForm)
