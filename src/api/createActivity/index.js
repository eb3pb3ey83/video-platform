import getService from '../service'
import transformRequest from './transformRequest'

const url = '/media/Event'

export function createActivity(url, { data }) {
  return getService({
    config: {
      url,
      method: 'POST',
      data,
    },
    transformRequest,
    name: 'CREATE_ACTIVITY',
    withAccessToken: true,
  })
}

export default url
