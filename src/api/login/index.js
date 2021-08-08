import getService from '../service'
import transformRequest from './transformRequest'

const url = '/MediaPlatform/Login'

export function login(url, { account, password }) {
  return getService({
    config: {
      url,
      method: 'POST',
      data: { account, password },
    },
    name: 'LOGIN',
    withAccessToken: false,
    transformRequest,
  })
}

export default url
