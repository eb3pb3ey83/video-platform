import React from 'react'
import classnames from 'classnames/bind'
import styles from './style.module.scss'
import { useFormikContext } from 'formik'
import { useHistory, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

// Components
import Layout from '@/basicComponents/Layout'
import Panel from '@/basicComponents/Panel'
import Table from '@/basicComponents/Table'
import ActivityFilter from './components/ActivityFilter'
import ActivityButton from './components/ActivityButton'
import ButtonLoadmore from '@/views/Home/sharedComponents/ButtonLoadmore'
import Icon from '@/basicComponents/Icon'

// Lib MISC
import { usePlaceOptions } from '@/views/Home/eventHandler/shareComputedValues/usePlaceOptions'
import { useOrganizationOptions } from '@/views/Home/eventHandler/shareComputedValues/useOrganizationOptions'
import { useActivityDateRange } from '@/views/Home/eventHandler/shareComputedValues/useActivityDateRange'
import { useActivityEvents } from '../../eventHandler/computedValues/useActivityEvents'
import { redirectToInfo } from './eventHandler/methods/redirectToInfo'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  match: PropTypes.object,
}

const SORT_BY = {
  EVENT_ID: 'event_id',
  DATE: 'start_date',
  MEDIA_AMOUNT: 'media_amount',
}

function ActivityForm(props) {
  const { match } = props
  const history = useHistory()
  const formikContext = useFormikContext()
  const { values, setFieldValue } = formikContext
  const { placeOptions } = usePlaceOptions({ hasAll: true, isQuery: true })
  const { organizationOptions } = useOrganizationOptions()
  const { activityDateRange } = useActivityDateRange()

  const { activityData, isActivityEventsFetched, onLoadMoreClick } = useActivityEvents(values)
  const { activityEvents, hasMore } = activityData

  const { sortBy, isDescending } = values

  const onSortClick = event => {
    const selectedSortBy = event.currentTarget.dataset.sort

    if (selectedSortBy === sortBy) {
      setFieldValue('isDescending', !isDescending)
    } else {
      setFieldValue('isDescending', true)
    }

    setFieldValue('sortBy', selectedSortBy)
  }

  return (
    <Layout className={cx('activity')}>
      <Panel className={cx('activity-panel')}>
        <div className={cx('activity-bar')}>
          <ActivityFilter organizationOptions={organizationOptions} placeOptions={placeOptions} activityDateRange={activityDateRange} />
          <ActivityButton
            onExcelImportClick={() => history.push('/home/activity/import')}
            onAddActivityClick={() => history.push('/home/activity/create')}
          />
        </div>
        <Table
          className={cx('activity-table')}
          style={{ marginTop: 16 }}
          loading={!isActivityEventsFetched}
          data={activityEvents}
          noDataIcon={<Icon.NoActivity />}
          noDataText='無可查詢活動'
          pageSize={activityEvents.length || 10}
          getProps={() => ({ onClick: (event, handleOriginal) => redirectToInfo({ event, match, handleOriginal, history }) })}
          getTdProps={(state, row) => ({
            'data-row-type': typeof row,
            'data-event-id': row?.original?.eventId,
          })}
          columns={[
            {
              id: 'eventId',
              Header: (
                <Table.Title title='活動編號' name={SORT_BY.EVENT_ID} hasSort onSortClick={onSortClick} sortBy={sortBy} isDescending={isDescending} />
              ),
              accessor: 'eventId',
              headerStyle: { textAlign: 'left' },
              width: 120,
            },
            {
              id: 'eventName',
              Header: <Table.Title title='活動名稱' />,
              accessor: item => `${item.eventName?.year}年 ${item.eventName?.name}`,
              headerStyle: { textAlign: 'left' },
              width: 460,
            },
            {
              id: 'eventDate',
              Header: <Table.Title title='日期' name={SORT_BY.DATE} hasSort onSortClick={onSortClick} sortBy={sortBy} isDescending={isDescending} />,
              accessor: item => `${item.startDate} - ${item.endDate}`,
              headerStyle: { textAlign: 'left' },
              width: 210,
            },
            {
              Header: <Table.Title title='執行單位' />,
              accessor: 'organization.departmentName',
              headerStyle: { textAlign: 'left' },
              width: 190,
            },
            {
              Header: <Table.Title title='市場' />,
              accessor: 'place.placeNameCh',
              headerStyle: { textAlign: 'left' },
              width: 130,
            },
            {
              Header: (
                <Table.Title
                  title='媒體數'
                  name={SORT_BY.MEDIA_AMOUNT}
                  hasSort
                  onSortClick={onSortClick}
                  sortBy={sortBy}
                  isDescending={isDescending}
                />
              ),
              accessor: 'mediaAmount',
              headerStyle: { textAlign: 'left' },
              width: 106,
            },
          ]}
        />
        <ButtonLoadmore hasMore={hasMore} onLoadMoreClick={onLoadMoreClick} />
      </Panel>
    </Layout>
  )
}

ActivityForm.propTypes = propTypes

export default withRouter(ActivityForm)
