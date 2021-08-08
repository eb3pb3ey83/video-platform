import { isSameYear, isSameMonth, isSameDay } from 'date-fns'
import * as format from './format'

export default function(first, second) {
  const firstToCompare = format.parseDateTimeStringToInstance(first)
  const secondToCompare = format.parseDateTimeStringToInstance(second)

  return isSameYear(firstToCompare, secondToCompare) && isSameMonth(firstToCompare, secondToCompare) && isSameDay(firstToCompare, secondToCompare)
}
