import getService from '../service'
import transformResponse from './transformResponse'

const url = '/media/event/daterange'

export function fetchActivityDateRange(url) {
  return getService({
    config: {
      url,
      method: 'GET',
      params: {},
    },
    name: 'FETCH_ACTIVITY_DATE_RANGE',
    transformResponse,
  })
}

export default url
