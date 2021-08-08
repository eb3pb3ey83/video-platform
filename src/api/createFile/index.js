import getService from '../service'
import transformRequest from './transformRequest'

const url = '/media/event/import'

export function createFile(url, { file, organizationId }) {
  console.log('organizationId :', organizationId)

  return getService({
    config: {
      url,
      method: 'POST',
      data: { file, organizationId },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
    transformRequest,
    name: 'CREATE_FILE',
    withAccessToken: true,
  })
}

export default url
