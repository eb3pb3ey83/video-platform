import { addMinutes, isBefore } from 'date-fns'
import * as format from './format'
import isSameTime from './is-same-time'

export default function(startTime, endTime, minuteStep) {
  let interval = []
  let nextTime = format.parseDateTimeStringToInstance(startTime)

  do {
    interval = [...interval, nextTime]
    nextTime = addMinutes(nextTime, minuteStep)
  } while (isSameTime(nextTime, format.parseDateTimeStringToInstance(endTime)) || isBefore(nextTime, format.parseDateTimeStringToInstance(endTime)))

  return interval
}
