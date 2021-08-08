import getService from '../service'
import transformRequest from './transformRequest'
import transformResponse from './transformResponse'

const url = 'media/application/'

export function fetchManagementApplicationRecordData(url, { employeeId, organizationId, pagingIndex, pagingSize, startDate, endDate }) {
  return getService({
    config: {
      url,
      method: 'GET',
      params: { employeeId, organizationId, pagingIndex, pagingSize, startDate, endDate },
    },
    name: 'FETCH_MANAGEMENT_APPLICATION_RECORD_DATA',
    transformRequest,
    transformResponse,
  })
}

export default url
