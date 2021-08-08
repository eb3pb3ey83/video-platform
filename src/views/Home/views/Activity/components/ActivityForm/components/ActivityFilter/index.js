import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { useFormikContext } from 'formik'

import { handleValuesChange } from '../ActivityFilter/eventHandler/methods/handleValuesChange'

// Components
import Form from '@/basicComponents/Form'
import FormItem from '@/views/Home/sharedComponents/FormItem'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  className: PropTypes.string,
  organizationOptions: PropTypes.array,
  placeOptions: PropTypes.array,
  activityDateRange: PropTypes.object,
}

function ActivityFilter(props) {
  const { className, organizationOptions, placeOptions, activityDateRange } = props

  const { setFieldValue } = useFormikContext()

  const { handleResetNumber, handleResetAllExceptEventId } = handleValuesChange(setFieldValue, activityDateRange)

  return (
    <div className={cx('activity-filter', className)}>
      <div className={cx('activity-filter__column')}>
        <FormItem name='活動日期' nameWidth={70} marginBottom={16}>
          <Form.DateInputField
            className={cx('activity-filter-rangepicker')}
            startDateField='startDate'
            endDateField='endDate'
            handleResetNumber={handleResetNumber}
          />
        </FormItem>

        <FormItem name='單位' nameWidth={70} marginBottom={16}>
          <Form.SelectField
            className={cx('activity-filter-select')}
            options={organizationOptions}
            name='organizationId'
            handleResetNumber={handleResetNumber}
          />
        </FormItem>
      </div>

      <div className={cx('activity-filter__column')}>
        <FormItem name='市場' nameWidth={150} marginBottom={16}>
          <Form.SelectField className={cx('activity-filter-select')} options={placeOptions} name='placeId' handleResetNumber={handleResetNumber} />
        </FormItem>

        <FormItem name='活動編號' nameWidth={150} marginBottom={16}>
          <Form.InputField
            className={cx('activity-filter-input')}
            placeholder='單以活動編號查詢'
            name='eventId'
            isOnlyNumber
            onChange={handleResetAllExceptEventId}
          />
        </FormItem>
      </div>
    </div>
  )
}

ActivityFilter.propTypes = propTypes

export default ActivityFilter
