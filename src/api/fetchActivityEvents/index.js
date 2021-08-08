import getService from '../service'
import transformRequest from './transformRequest'
import transformResponse from './transformResponse'

const url = '/media/event'

export function fetchActivityEvents(url, { pageIndex, pageSize, startDate, endDate, organizationId, placeId, eventId, isDescending, sortBy }) {
  return getService({
    config: {
      url,
      method: 'GET',
      params: { pageIndex, pageSize, startDate, endDate, organizationId, placeId, eventId, isDescending, sortBy },
    },
    name: 'FETCH_ACTIVITY_EVENTS',
    transformRequest,
    transformResponse,
  })
}

export default url
