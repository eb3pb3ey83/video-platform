import getService from '../service'
import transformRequest from './transformRequest'
import transformResponse from './transformResponse'

const url = '/media/attachment'

export function fetchMediaData(
  url,
  { pageIndex, pageSize, startDate, endDate, eventName, keyword, fileNo, mediaType, accessAuthority, placeId, organizationId, projectNo },
) {
  return getService({
    config: {
      url,
      method: 'GET',
      params: { pageIndex, pageSize, startDate, endDate, eventName, keyword, fileNo, mediaType, accessAuthority, placeId, organizationId, projectNo },
    },
    name: 'FETCH_MEDIA_DATA',
    transformRequest,
    transformResponse,
  })
}

export default url
