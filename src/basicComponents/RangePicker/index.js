import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import moment from 'moment'

// Components
import { DatePicker } from 'antd'
import Icon from '@/basicComponents/Icon'

// Style
import styles from './style.module.scss'
import 'antd/lib/date-picker/style/css'

const { RangePicker } = DatePicker

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  defaultStartDate: PropTypes.string,
  defaultEndDate: PropTypes.string,
  className: PropTypes.string,
}

export const defaultProps = {}

function RangePickerComponent(props) {
  const { defaultStartDate, defaultEndDate, className, ...restProps } = props

  const dateFormat = 'YYYY/MM/DD'

  const startDate = defaultStartDate ? moment(defaultStartDate, dateFormat) : null
  const endDate = defaultEndDate ? moment(defaultEndDate, dateFormat) : null

  return (
    <RangePicker
      {...restProps}
      className={cx('rangepicker', className)}
      defaultValue={[startDate, endDate]}
      format={dateFormat}
      allowClear={false}
      suffixIcon={<Icon.Calendar role='calendar-icon' />}
    />
  )
}

RangePickerComponent.propTypes = propTypes
RangePickerComponent.defaultProps = defaultProps

export default RangePickerComponent
