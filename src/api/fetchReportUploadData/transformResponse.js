import { format } from 'date-fns'

const transferUploadItem = list => {
  return list.map((item, index) => {
    return {
      no: index + 1,
      organization: {
        organizationId: item.organization?.orgId,
        departmentId: item.organization?.deptId,
        departmentName: item.organization?.deptName,
        teamId: item.organization?.teamId,
        teamName: item.organization?.teamName,
      },
      createdUser: {
        employeeId: item.createdUser.empId,
        employeeName: item.createdUser.empName,
        teamId: item.createdUser.teamId,
        teamName: item.createdUser.teamName,
      },
      eventYear: item.eventName.year,
      eventName: item.eventName.name,
      lastDate: format(new Date(item.lastDate), 'yyyy/MM/dd'),
      imageAmount: item.imageAmount,
      videoAmount: item.videoAmount,
    }
  })
}

export default ({ list, eventAmount, imageAmount, videoAmount }) => {
  return {
    hasMore: list.more,
    reportList: transferUploadItem(list.list),
    eventAmount,
    imageAmount,
    videoAmount,
  }
}
