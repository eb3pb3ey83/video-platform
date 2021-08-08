import getService from '../service'
import transformRequest from './transformRequest'
// import transformResponse from './transformResponse'

const url = 'media/attachment'

export function updateMediaFile(url, data) {
  return getService({
    config: {
      url,
      method: 'PUT',
      data,
    },
    name: 'UPDATE_MEDIA_FILE',
    transformRequest,
  })
}

export default url
