import getService from '../service'
import transformResponse from './transformResponse'

const url = '/media/org/search'

export function fetchOrganizationOptions(url) {
  return getService({
    config: {
      url,
      method: 'GET',
      params: {},
    },
    name: 'FETCH_ORGANIZATION_OPTIONS',
    transformResponse,
  })
}

export default url
