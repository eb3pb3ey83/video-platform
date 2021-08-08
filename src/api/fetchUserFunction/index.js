import getService from '../service'
import transformRequest from './transformRequest'
import transformResponse from './transformResponse'

const url = '/Function/personal'

export function fetchUserFunction(url, { departmentId, teamId }) {
  return getService({
    config: {
      url,
      method: 'GET',
      params: {
        departmentId,
        teamId,
      },
    },
    transformRequest,
    transformResponse,
    name: 'FETCH_USER_FUNCTION',
  })
}

export default url
