import getService from '../service'
// import transformRequest from './transformRequest'
// import transformResponse from './transformResponse'

const url = 'media/attachment/chunk'

export function deleteMediaChunkFile(url) {
  return getService({
    config: {
      url,
      method: 'DELETE',
    },
    name: 'DELETE_CHUNK_FILE',
  })
}

export default url
