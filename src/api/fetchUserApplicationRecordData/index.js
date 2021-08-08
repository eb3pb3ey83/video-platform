import getService from '../service'
import transformRequest from './transformRequest'

const url = '/media/application/'

export function fetchUserApplicationRecordData(url, { employeeId, organizationId }) {
  return getService({
    config: {
      url,
      method: 'GET',
      params: { employeeId, organizationId },
    },
    transformRequest,
    name: 'FETCH_USER_APPLICATION_RECORD_DATA',
  })
}

export default url
