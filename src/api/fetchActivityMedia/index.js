import getService from '../service'
import transformRequest from './transformRequest'
import transformResponse from './transformResponse'

const url = '/media/attachment/event/'

export function fetchActivityMedia(url, { pageIndex, pageSize, eventId, mediaType }) {
  return getService({
    config: {
      url,
      method: 'GET',
      params: { pageIndex, pageSize, eventId, mediaType },
    },
    name: 'FETCH_ACTIVITY_MEDIA',
    transformRequest,
    transformResponse,
  })
}

export default url
