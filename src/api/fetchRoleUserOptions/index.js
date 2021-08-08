import getService from '../service'
import transformRequest from './transformRequest'
import transformResponse from './transformResponse'

const url = '/Role/user/33'

export function fetchRoleUserOptions(url, { hasAll, isQuery, pagingIndex, pagingSize }) {
  return getService({
    config: {
      url,
      method: 'GET',
      params: {
        hasAll,
        isQuery,
        pagingIndex,
        pagingSize,
      },
    },
    transformRequest,
    transformResponse,
    name: 'ROLE_USER_OPTIONS',
  })
}

export default url
