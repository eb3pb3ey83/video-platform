import getService from '../service'
// import transformRequest from './transformRequest'
// import transformResponse from './transformResponse'

const url = ''

export function functionName(url, parametersOfFrontEndKey) {
  return getService({
    config: {
      url,
      method: 'GET',
      params: {
        parametersOfFrontEndKey,
      },
    },
    name: 'TEMPLATE_NAME',
  })
}

export default url
