import { format } from 'date-fns'

const transferDetailItem = list => {
  return list.map(item => {
    return {
      attachmentId: item.attachmentId,
      video: item.video,
      accessAuthority: item.accessAuthority,
      organization: {
        organizationId: item.organization?.orgId,
        deparmentId: item.organization?.deptId,
        departmentName: item.organization?.deptName,
        teamId: item.organization?.teamId,
        teamName: item.organization?.teamName,
      },
      downloadUser: {
        employeeId: item.user.empId,
        employeeName: item.user.empName,
        departmentId: item.user.deptId,
        departmentName: item.user.deptName,
        teamId: item.user.teamId,
        teamName: item.user.teamName,
      },
      lastDate: format(new Date(item.lastDate), 'yyyy/MM/dd'),
      downloadAmount: item.amount,
    }
  })
}

const transferDownloadItem = list => {
  return list.map((item, index) => {
    return {
      no: index + 1,
      eventYear: item.eventName.year,
      eventName: item.eventName.name,
      imageAmount: item.imageAmount,
      videoAmount: item.videoAmount,
      totalAmount: item.totalAmount,
      detail: transferDetailItem(item.detail),
    }
  })
}

export default ({ list, totalAmount }) => {
  return {
    hasMore: list.more,
    downloadList: transferDownloadItem(list.list),
    totalAmount,
  }
}
