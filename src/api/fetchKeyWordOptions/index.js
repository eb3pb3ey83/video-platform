import getService from '../service'
// import transformRequest from './transformRequest'
import transformResponse from './transformResponse'

const url = '/media/maintain/category/1/item' // 關鍵字的 categoryId 為 1

export function fetchKeyWordOptions(url, { categoryId, all }) {
  return getService({
    config: {
      url,
      method: 'GET',
      params: { categoryId, all },
    },
    // transformRequest,
    transformResponse,
    name: 'KEY_WORD_OPTIONS',
  })
}

export default url
