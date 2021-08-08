import { isSameHour, isSameMinute, isSameSecond } from 'date-fns'
import * as format from './format'

export default function(first, second) {
  const firstToCompare = format.parseDateTimeStringToInstance(first)
  const secondToCompare = format.parseDateTimeStringToInstance(second)

  return isSameHour(firstToCompare, secondToCompare) && isSameMinute(firstToCompare, secondToCompare) && isSameSecond(firstToCompare, secondToCompare)
}
