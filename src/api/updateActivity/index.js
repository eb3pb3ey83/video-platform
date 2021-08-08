import getService from '../service'
import transformRequest from './transformRequest'
// import transformResponse from './transformResponse'

const url = '/media/Event'

export function updateActivity(url, data) {
  return getService({
    config: {
      url,
      method: 'PUT',
      data,
    },
    name: 'UPDATE_ACTIVITY',
    transformRequest,
  })
}

export default url
