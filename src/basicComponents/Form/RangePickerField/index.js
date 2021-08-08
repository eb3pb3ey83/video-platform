import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useFormikContext } from 'formik'
import RangePicker from '@/basicComponents/RangePicker'

// Style

// Variables / Functions

export const propTypes = {
  startDateField: PropTypes.string,
  endDateField: PropTypes.string,
  activityYear: PropTypes.string,
}

export const defaultProps = {}

function RangePickerField(props) {
  const { startDateField, endDateField, activityYear, ...restProps } = props

  const { setFieldValue } = useFormikContext()

  // 客戶要求 activityYear 變動時，rangePicker 的 year 也要跟著變動
  useEffect(() => {
    if (activityYear) {
      const numberRex = /^[0-9]*$/g
      const isValidYear = activityYear.match(numberRex)

      if (!isValidYear) return

      setFieldValue(startDateField, `${activityYear}/01/01`)
      setFieldValue(endDateField, `${activityYear}/12/31`)
    }
  }, [activityYear, endDateField, setFieldValue, startDateField])

  const onRangePickerChange = (event, date, dateString) => {
    const selectedstartDate = date[0]
    const selectedEndDate = date[1]

    setFieldValue(startDateField, selectedstartDate)
    setFieldValue(endDateField, selectedEndDate)
  }

  return <RangePicker onChange={onRangePickerChange} {...restProps} />
}

RangePickerField.propTypes = propTypes
RangePickerField.defaultProps = defaultProps

export default RangePickerField
