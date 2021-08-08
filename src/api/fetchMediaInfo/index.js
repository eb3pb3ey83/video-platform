import getService from '../service'
import transformRequest from './transformRequest'
import transformResponse from './transformResponse'

const url = 'media/attachment/'

export function fetchMediaInfo(url, { attachmentId, organizationId }) {
  return getService({
    config: {
      url,
      method: 'GET',
      params: { attachmentId, organizationId },
    },
    name: 'FETCH_MEDIA_INFO',
    transformRequest,
    transformResponse,
  })
}

export default url
