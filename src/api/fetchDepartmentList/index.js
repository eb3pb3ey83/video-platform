import getService from '../service'
import transformRequest from './transformRequest'

export function fetchDepartmentList({ pagingIndex, pagingSize, employeeId }) {
  return getService({
    config: {
      url: `/User/role/${employeeId}`,
      method: 'GET',
      params: { pagingIndex, pagingSize, employeeId },
    },
    transformRequest,
    name: 'FETCH_DEPARTMENT_LIST',
  })
}
