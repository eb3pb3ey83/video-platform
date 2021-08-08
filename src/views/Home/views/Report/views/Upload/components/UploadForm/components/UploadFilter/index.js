import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { getCurrentUserRole } from '@/utils/getUserInfo'

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
}

function UploadFilter(props) {
  const { className, organizationOptions } = props

  const userRole = getCurrentUserRole()
  const { isHighestRole } = userRole

  return (
    <div className={cx('upload-filter', className)}>
      <div className={cx('upload-filter__column')}>
        <FormItem name='單位' nameWidth={56} marginBottom={16}>
          <Form.SelectField isDisabled={!isHighestRole} className={cx('upload-filter-select')} options={organizationOptions} name='organizationId' />
        </FormItem>
        <FormItem name='日期' nameWidth={56} marginBottom={16} maxHeight={35}>
          <Form.DateInputField className={cx('upload-filter-rangepicker')} startDateField='startDate' endDateField='endDate' />
        </FormItem>
      </div>
    </div>
  )
}

UploadFilter.propTypes = propTypes

export default UploadFilter
