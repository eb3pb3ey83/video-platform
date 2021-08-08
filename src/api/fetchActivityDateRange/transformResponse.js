import { format } from 'date-fns'

export default ({ startDate, endDate }) => {
  return {
    activityStartDate: format(new Date(startDate), 'yyyy/MM/dd'),
    activityEndDate: format(new Date(endDate), 'yyyy/MM/dd'),
  }
}
