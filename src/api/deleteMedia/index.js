import getService from '../service'
import transformRequest from './transformRequest'
// import transformResponse from './transformResponse'

const url = '/media/attachment'

export function deleteMedia(url, { organizationId }) {
  return getService({
    config: {
      url,
      method: 'DELETE',
      params: { organizationId },
    },
    name: 'DELETE_MEDIA',
    transformRequest,
  })
}

export default url
