import { format } from 'date-fns'

const transferRecordItem = list => {
  return list.map((item, index) => {
    return {
      recordId: item.applicationId,
      organization: {
        organizationId: item.organization.orgId,
        departmentId: item.organization.deptId,
        departmentName: item.organization.deptName,
        teamId: item.organization.teamId,
        teamName: item.organization.teamName,
      },
      applicant: {
        employeeId: item.applicant.empId,
        employeeName: item.applicant.empName,
        organization: item.applicant.organization.map(item => {
          return {
            departmentId: item.deptId,
            departmentName: item.deptName,
            teamId: item.teamId,
            teamName: item.teamName,
          }
        }),
        departmentId: item.applicant.deptId,
        departmentName: item.applicant.deptName,
        teamId: item.applicant.teamId,
        teamName: item.applicant.teamName,
      },
      eventId: item.eventId,
      eventYear: item.eventName?.year,
      eventName: item.eventName?.name,
      createdDate: format(new Date(item.createdDate), 'yyyy/MM/dd'),
      startDate: format(new Date(item.startDate), 'yyyy/MM/dd'),
      endDate: format(new Date(item.endDate), 'yyyy/MM/dd'),
    }
  })
}

export default ({ list }) => {
  return {
    recordList: transferRecordItem(list),
  }
}
