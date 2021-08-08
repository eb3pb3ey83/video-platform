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

function RecordFilter(props) {
  const { className } = props

  return (
    <div className={cx('record-filter', className)}>
      <div className={cx('record-filter__column')}>
        <FormItem name='申請時間' nameWidth={68}>
          <Form.DateInputField className={cx('record-filter-rangepicker')} startDateField='startDate' endDateField='endDate' />
        </FormItem>
      </div>
    </div>
  )
}

RecordFilter.propTypes = propTypes

export default RecordFilter
