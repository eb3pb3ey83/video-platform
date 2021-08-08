import getService from '../service'
import transformRequest from './transformRequest'
import transformResponse from './transformResponse'

const url = '/media/place'

export function fetchPlaceOptions(url, { hasAll, isQuery }) {
  return getService({
    config: {
      url,
      method: 'GET',
      params: { hasAll, isQuery },
    },
    transformRequest,
    transformResponse,
    name: 'FETCH_PLACE_OPTIONS',
  })
}

export default url
