import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Form from '@/basicComponents/Form'
import FormItem from '@/views/Home/sharedComponents/FormItem'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  className: PropTypes.string,
}

function ApplicationRecordFilter(props) {
  const { className } = props

  return (
    <div className={cx('application-record-filter', className)}>
      <div className={cx('application-record-filter__column')}>
        <FormItem name='可下載時間' nameWidth={95} marginBottom={16}>
          <Form.DateInputField className={cx('application-record-filter-rangepicker')} startDateField='startDate' endDateField='endDate' />
        </FormItem>
      </div>
    </div>
  )
}

ApplicationRecordFilter.propTypes = propTypes

export default ApplicationRecordFilter
