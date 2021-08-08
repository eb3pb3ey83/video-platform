import getService from '../service'
import transformRequest from './transformRequest'
// import transformResponse from './transformResponse'

const url = 'media/application'

export function createDownloadPermission(url, data) {
  return getService({
    config: {
      url,
      method: 'POST',
      data,
    },
    name: 'CREATE_DOWNLOAD_PERMISSION',
    transformRequest,
  })
}

export default url
