import getService from '../service'

import transformRequest from './transformRequest'
// import transformResponse from './transformResponse'

const url = 'media/attachment/download'

export function downloadMediaFile(url, { attachmentId, organizationId }) {
  return getService({
    config: {
      url,
      method: 'GET',
      params: {
        attachmentId,
        organizationId,
      },
    },
    name: 'DOWNLOAD_MEDIA_FILE',
    transformRequest,
  })
}

export default url
