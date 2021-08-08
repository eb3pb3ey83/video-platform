import { getMilliseconds, getSeconds, getMinutes, getHours, setMilliseconds, setSeconds, setMinutes, setHours } from 'date-fns'
import * as format from './format'

export default function(dateTime, option = {}) {
  const dateTimeToChange = format.parseDateTimeStringToInstance(dateTime)

  const hours = typeof option.hours === 'number' ? option.hours : getHours(dateTimeToChange)
  const minutes = typeof option.minutes === 'number' ? option.minutes : getMinutes(dateTimeToChange)
  const seconds = typeof option.seconds === 'number' ? option.seconds : getSeconds(dateTimeToChange)
  const milliseconds = typeof option.milliseconds === 'number' ? option.milliseconds : getMilliseconds(dateTimeToChange)

  return setMilliseconds(setSeconds(setMinutes(setHours(dateTimeToChange, hours), minutes), seconds), milliseconds)
}
