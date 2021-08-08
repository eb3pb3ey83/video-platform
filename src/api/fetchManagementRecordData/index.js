import getService from '../service'
import transformRequest from './transformRequest'
import transformResponse from './transformResponse'

const url = '/media/application'

export function fetchManagementRecordData(url, { pagingIndex, pagingSize, startDate, endDate }) {
  return getService({
    config: {
      url,
      method: 'GET',
      params: { pagingIndex, pagingSize, startDate, endDate },
    },
    name: 'FETCH_MANAGEMENT_RECORD_DATA',
    transformRequest,
    transformResponse,
  })
}

export default url
