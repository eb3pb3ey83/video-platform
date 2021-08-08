import getService from '../service'
import transformResponse from './transformResponse'

const url = '/media/org'

export function fetchOrganizationList(url) {
  return getService({
    config: {
      url,
      method: 'GET',
      params: {},
    },
    name: 'FETCH_ORGANIZATION_LIST',
    transformResponse,
  })
}

export default url
