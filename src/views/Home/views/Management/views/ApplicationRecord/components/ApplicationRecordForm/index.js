import React from 'react'
import classnames from 'classnames/bind'
import styles from './style.module.scss'
import { withRouter } from 'react-router-dom'
import { useFormikContext } from 'formik'

// Components
import Layout from '@/basicComponents/Layout'
import Panel from '@/basicComponents/Panel'
import Table from '@/basicComponents/Table'
import ApplicationRecordFilter from './components/ApplicationRecordFilter'
import Icon from '@/basicComponents/Icon'
import NoEventIdText from '../../../../shareComponents/NoEventIdText'
import NoEventNameText from '../../../../shareComponents/NoEventNameText'

// Lib MISC
import { useManagementApplicationRecordData } from '../../eventHandler/computedValues/useManagementApplicationRecordData'
import { getCurrentOrganization } from '@/utils/getUserInfo'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {}

function ApplicationRecordForm(props) {
  const employeeId = window.localStorage.getItem('userId')
  const currentOrganization = getCurrentOrganization()
  const { organizationIdByTeam } = currentOrganization
  const { values } = useFormikContext()

  const { applicationRecordData, isManagementApplicationRecordDataFetched } = useManagementApplicationRecordData(
    values,
    employeeId,
    organizationIdByTeam,
  )
  const { applicationRecordList } = applicationRecordData

  return (
    <Layout className={cx('application-record')}>
      <Panel className={cx('application-record-panel')}>
        <div className={cx('application-record-bar')}>
          <ApplicationRecordFilter />
        </div>
        <Table
          style={{ marginTop: 16 }}
          loading={!isManagementApplicationRecordDataFetched}
          data={applicationRecordList}
          noDataIcon={<Icon.NoReport />}
          noDataText='系統無任何資料'
          pageSize={applicationRecordList.length || 10}
          columns={[
            {
              Header: <Table.Title title='申請編號' />,
              accessor: 'applicationId',
              headerStyle: { textAlign: 'left' },
              width: 203,
            },
            {
              id: 'eventNo',
              Header: <Table.Title title='活動編號' />,
              accessor: item => item.eventId ?? <NoEventIdText />,
              headerStyle: { textAlign: 'left' },
              width: 203,
            },
            {
              id: 'eventName',
              Header: <Table.Title title='活動名稱' />,
              accessor: item => (item.eventName ? `${item.eventYear}年 ${item.eventName}` : <NoEventNameText />),
              headerStyle: { textAlign: 'left' },
              width: 497,
            },
            {
              id: 'downloadTime',
              Header: <Table.Title title='可下載時間' />,
              accessor: item => `${item.startDate} - ${item.endDate}`,
              headerStyle: { textAlign: 'left' },
              width: 313,
            },
          ]}
        />
      </Panel>
    </Layout>
  )
}

ApplicationRecordForm.propTypes = propTypes

export default withRouter(ApplicationRecordForm)
