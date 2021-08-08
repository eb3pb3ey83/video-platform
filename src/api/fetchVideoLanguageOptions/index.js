import getService from '../service'
import transformRequest from './transformRequest'
import transformResponse from './transformResponse'

const url = '/media/maintain/category/0/item'

export function fetchVideoLanguageOptions(url, { hasAll, isQuery }) {
  return getService({
    config: {
      url,
      method: 'GET',
      params: { hasAll, isQuery },
    },
    transformRequest,
    transformResponse,
    name: 'VIDEO_LANGUAGE_OPTIONS',
  })
}

export default url
