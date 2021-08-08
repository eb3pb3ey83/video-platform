import getService from '../service'
// import transformRequest from './transformRequest'
import transformResponse from './transformResponse'

const url = 'media/event/'

export function fetchActivityInfo(url) {
  return getService({
    config: {
      url,
      method: 'GET',
    },
    name: 'FETCH_ACTIVITY_INFO',
    transformResponse,
  })
}

export default url
