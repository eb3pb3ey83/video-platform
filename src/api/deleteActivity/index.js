import getService from '../service'
import transformRequest from './transformRequest'
// import transformResponse from './transformResponse'

const url = '/media/Event'

export function deleteActivity(url, { organizationId }) {
  return getService({
    config: {
      url,
      method: 'DELETE',
      params: { organizationId },
    },
    name: 'DELETE_ACTIVITY',
    transformRequest,
  })
}

export default url
