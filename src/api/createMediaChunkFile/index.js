import getService from '../service'
// import transformRequest from './transformRequest'
// import transformResponse from './transformResponse'

const url = 'media/attachment/chunk/upload'

export function createMediaChunkFile(url, { contentRange, uploadId, file }) {
  return getService({
    config: {
      url,
      method: 'POST',
      headers: {
        'content-type': 'multipart/form-data',
      },
      data: {
        contentRange,
        uploadId,
        file,
      },
    },
    name: 'CREATE_CHUNK_FILE',
  })
}

export default url
