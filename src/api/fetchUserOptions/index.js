import getService from '../service'
import transformRequest from './transformRequest'
import transformResponse from './transformResponse'

const url = '/User'

export function fetchUserOptions(url, { userName }) {
  return getService({
    config: {
      url,
      method: 'GET',
      params: {
        userName,
        pagingIndex: 0,
        pagingSize: 0,
      },
    },
    transformRequest,
    transformResponse,
    name: 'FETCH_USER_OPTIONS',
  })
}

export default url
