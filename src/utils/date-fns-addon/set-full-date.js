import { getDate, getMonth, getYear, setDate, setMonth, setYear } from 'date-fns'
import * as format from './format'

export default function(dateTime, option = {}) {
  const dateTimeToChange = format.parseDateTimeStringToInstance(dateTime)

  const year = typeof option.year === 'number' ? option.year : getYear(dateTimeToChange)
  const month = typeof option.month === 'number' ? option.month : getMonth(dateTimeToChange)
  const date = typeof option.date === 'number' ? option.date : getDate(dateTimeToChange)

  return setDate(setMonth(setYear(dateTimeToChange, year), month), date)
}
