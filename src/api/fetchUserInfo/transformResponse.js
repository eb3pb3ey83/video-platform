import { head } from 'lodash'

export default ({
  empId,
  empName,
  email,
  organization,
  deptId,
  deptName,
  teamId,
  teamName,
  jobDesc,
  ext,
  mobilePhone,
  managers,
  status,
  requestDate,
}) => ({
  employeeId: empId,
  employeeName: empName,
  email: email,
  organizations: organization.map(item => {
    return {
      departmentName: item.deptName,
      departmentId: item.deptId,
      teamId: item.teamId,
      teamName: item.teamName,
      role: head(item.role),
    }
  }),
  departmentId: deptId,
  departmentName: deptName,
  teamId,
  teamName,
  jobDescription: jobDesc,
  extensionNumber: ext,
  mobilePhone,
  managers,
  status,
  requestDate,
})
