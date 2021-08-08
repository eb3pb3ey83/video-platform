import { format } from 'date-fns'

const transferApplicationRecordItem = list => {
  return list.map((item, index) => {
    return {
      applicationId: item.applicationId,
      eventId: item.eventId,
      eventYear: item.eventName?.year,
      eventName: item.eventName?.name,
      startDate: format(new Date(item.startDate), 'yyyy/MM/dd'),
      endDate: format(new Date(item.endDate), 'yyyy/MM/dd'),
    }
  })
}

export default ({ list }) => {
  return {
    applicationRecordList: transferApplicationRecordItem(list),
  }
}
