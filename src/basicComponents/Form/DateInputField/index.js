import React, { useRef, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { useFormikContext } from 'formik'
import { Subject } from 'rxjs'
import { map } from 'rxjs/operators'
import { isBefore, isAfter } from 'date-fns'
import styles from './style.module.scss'

// Components
import Input from '@/basicComponents/Input'
import ErrorMessage from '../ErrorMessage'

// Lib MISC
import useObservable from '@/effects/useObservable'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  className: PropTypes.string,
  startDateField: PropTypes.string,
  endDateField: PropTypes.string,
  size: PropTypes.string,
  height: PropTypes.number,
  isOnlyNumber: PropTypes.bool,
  handleResetNumber: PropTypes.func,
}

export const defaultProps = { size: 'md', isOnlyNumber: false, handleResetNumber: () => {} }

function DateInputField(props) {
  const { height, startDateField, endDateField, size, isOnlyNumber, handleResetNumber, className, ...restProps } = props
  const { values, setFieldValue, setFieldTouched, setFieldError } = useFormikContext()

  const validateDate = useCallback(
    dateField => {
      setFieldTouched(dateField, true)

      // 如果輸入的日期有 "/", 則把 "/" 去除 ex: '2020/01/31 -> 20200131
      const currentDate = values[dateField].replace(/\//g, '')
      // 驗證日期格式是否正確(正確格式：20200131)
      const isDateVaild = currentDate.match(/^[1-9]{1}\d{7}$/)

      if (!isDateVaild) throw setFieldError(dateField, '請輸入完整之西元年月日')

      return currentDate
    },
    [setFieldError, setFieldTouched, values],
  )

  const splitDate = currentDate => {
    const year = Number(currentDate.substr(0, 4))
    const month = Number(currentDate.substr(4, 2))
    const day = Number(currentDate.substr(6, 2))

    return { year, month, day }
  }

  const getYear = ({ year, month, day }) => {
    // 判斷是否為閏年
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0

    return { year: String(year), isLeapYear, month, day }
  }

  const getMonth = ({ year, isLeapYear, month, day }) => {
    const is30DayMonth = [4, 6, 9, 11].indexOf(month) !== -1

    // 如果輸入的月份超過 12 月, 則將月份改為 12 月 ex: 2020/13/31 -> 2020/12/31
    // 如果輸入的月份為個位數，則在月份前面補零 ex: 2020/3/31 -> 2020/03/31
    const currentMonth = month > 12 ? String(12) : String(month).padStart(2, '0')

    return { year, isLeapYear, month: currentMonth, is30DayMonth, day }
  }

  const getDay = ({ year, isLeapYear, month, is30DayMonth, day }) => {
    const handleFebruaryLastDay = () => (isLeapYear ? 29 : 28)
    const handleLastDay = () => (is30DayMonth ? 30 : 31)
    const isFebruary = Number(month) === 2
    const lastDay = isFebruary ? handleFebruaryLastDay() : handleLastDay()

    // 如果輸入的日期超過當月最後一日, 則將日期改為當月最後一日 ex: 2020/12/77 -> 2020/12/31
    // 如果輸入的日期為個位數，則在日期前面補零 ex: 2020/03/3 -> 2020/03/03
    return `${year}/${month}/${day > lastDay ? String(lastDay) : String(day).padStart(2, '0')}`
  }

  const onStartDateChange = event => {
    const currentValue = event.target.value

    if (currentValue.length > 10) return

    const currentYear = currentValue.slice(0, 4)
    const endDateYear = values[endDateField].slice(0, 4)
    const isYearChanged = currentYear !== endDateYear

    // 起日如果已輸入年，則訖日帶出同一年的最後一日
    if (currentValue.match(/^[1-9]{1}\d{3}/) && isYearChanged) {
      setFieldValue(endDateField, `${currentYear}/12/31`)
    }

    setFieldValue(startDateField, event.target.value)
    handleResetNumber()
  }

  const onEndDateChange = event => {
    const currentValue = event.target.value

    if (currentValue.length > 10) return

    setFieldValue(endDateField, event.target.value)
    handleResetNumber()
  }

  const startDateSubjectRef = useRef(new Subject())
  const endDateSubjectRef = useRef(new Subject())

  const getDateObservable = useCallback(
    (observable, checkDateRange) => observable.pipe(map(validateDate), map(splitDate), map(getYear), map(getMonth), map(getDay), map(checkDateRange)),
    [validateDate],
  )

  const startDateObservable = useMemo(
    () =>
      getDateObservable(startDateSubjectRef.current, date => {
        const endDate = values[endDateField]

        // 判斷起始日是否超過結束日，如果超過就把起始日和結束日設為同日
        return isAfter(new Date(date), new Date(endDate)) ? endDate : date
      }),
    [endDateField, getDateObservable, values],
  )

  const endDateObservable = useMemo(
    () =>
      getDateObservable(endDateSubjectRef.current, date => {
        const startDate = values[startDateField]

        // 判斷結束日是否在起始日之前，如果超過就把起始日和結束日設為同日
        return isBefore(new Date(date), new Date(startDate)) ? startDate : date
      }),
    [getDateObservable, values, startDateField],
  )

  useObservable(startDateObservable, result => setFieldValue(startDateField, result))
  useObservable(endDateObservable, result => setFieldValue(endDateField, result))

  return (
    <>
      <div className={cx('date-input-field', className)} style={{ height }}>
        <div className={cx('input-field-wrapper')}>
          <Input
            {...restProps}
            className={cx('start-date-input')}
            style={{ paddingLeft: '10px' }}
            value={values[startDateField]}
            onBlur={() => startDateSubjectRef.current.next(startDateField)}
            onChange={onStartDateChange}
            name={startDateField}
          />
        </div>

        <div className={cx('input-field-dash')}>~</div>

        <div className={cx('input-field-wrapper')}>
          <Input
            {...restProps}
            className={cx('end-date-input')}
            value={values[endDateField]}
            onBlur={() => endDateSubjectRef.current.next(endDateField)}
            onChange={onEndDateChange}
            name={endDateField}
          />
        </div>
      </div>

      <div className={cx('error-message-box')}>
        <ErrorMessage wrapperClassName={cx('start-date-error-message-wrapper')} isShowBorder={false} name={startDateField} size={size} />
        <ErrorMessage wrapperClassName={cx('end-date-error-message-wrapper')} isShowBorder={false} name={endDateField} size={size} />
      </div>
    </>
  )
}

DateInputField.propTypes = propTypes
DateInputField.defaultProps = defaultProps

export default DateInputField
