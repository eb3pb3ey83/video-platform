import { format } from 'date-fns'

const transferActivityItem = list => {
  return list.map(item => {
    return {
      ...item,
      eventId: item.eventId,
      startDate: format(new Date(item.startDate), 'yyyy/MM/dd'),
      endDate: format(new Date(item.endDate), 'yyyy/MM/dd'),
      organization: {
        departmentId: item?.organization?.deptId || '',
        departmentName: item?.organization?.deptName || '跨單位',
        teamId: item?.organization?.teamId || '',
        teamName: item?.organization?.teamName || '',
      },
    }
  })
}

export default ({ list, more }) => {
  return {
    hasMore: more,
    activityEvents: transferActivityItem(list),
  }
}
