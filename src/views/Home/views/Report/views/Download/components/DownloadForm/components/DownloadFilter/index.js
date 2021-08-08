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

function DownloadFilter(props) {
  const { className } = props

  return (
    <div className={cx('download-filter', className)}>
      <div className={cx('download-filter__column')}>
        <FormItem name='日期' nameWidth={56} marginBottom={16} maxHeight={35}>
          <Form.DateInputField className={cx('download-filter-rangepicker')} startDateField='startDate' endDateField='endDate' />
        </FormItem>
      </div>
    </div>
  )
}

DownloadFilter.propTypes = propTypes

export default DownloadFilter
