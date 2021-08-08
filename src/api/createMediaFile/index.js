import getService from '../service'
import transformRequest from './transformRequest'
// import transformResponse from './transformResponse'

const url = 'media/attachment/chunk/complete'

export function createMediaFile(url, { eventId, organizationId, accessAuthority, descName, uploadId, md5, ...restData }) {
  return getService({
    config: {
      url,
      method: 'POST',
      headers: {
        'content-type': 'multipart/form-data',
      },
      data: {
        ...restData,
        eventId,
        organizationId,
        accessAuthority,
        descName,
        uploadId,
        md5,
      },
    },
    transformRequest,
    name: 'CREATE_MEDIA_FILE',
  })
}

export default url
