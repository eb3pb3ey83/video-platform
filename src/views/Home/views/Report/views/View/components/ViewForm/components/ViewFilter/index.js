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

function ViewFilter(props) {
  const { className } = props

  return (
    <div className={cx('view-filter', className)}>
      <div className={cx('view-filter__column')}>
        <FormItem name='日期' nameWidth={56} marginBottom={16}>
          <Form.DateInputField className={cx('view-filter-rangepicker')} startDateField='startDate' endDateField='endDate' />
        </FormItem>
      </div>
    </div>
  )
}

ViewFilter.propTypes = propTypes

export default ViewFilter
