import { findIndex } from 'lodash'

export default list => {
  const newList = list
    .map(item => {
      return {
        departmentName: item.deptName,
        departmentId: item.deptId,
        teamId: item.teamId,
        teamName: item.teanName,
        organizationId: item.orgId,
      }
    })
    .filter((element, index, array) => {
      return findIndex(array, element) === index
    })

  return newList
}
