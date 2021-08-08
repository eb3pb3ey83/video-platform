import getService from '../service'
import transformResponse from './transformResponse'

const url = '/media/event/template'

export function fetchActivityTemplateOptions(url) {
  return getService({
    config: {
      url,
      method: 'GET',
      params: {},
    },
    transformResponse,
    name: 'FETCH_ACTIVITY_TEMPLATE_OPTIONS',
  })
}

export default url
