import getService from '../service'
import transformRequest from './transformRequest'
import transformResponse from './transformResponse'

const url = '/MediaPlatform/user/'

export function fetchUserInfo(url, { employeeId }) {
  return getService({
    config: {
      url,
      method: 'GET',
      params: { employeeId },
    },
    transformRequest,
    transformResponse,
    name: 'FETCH_USER_INFO',
  })
}

export default url
