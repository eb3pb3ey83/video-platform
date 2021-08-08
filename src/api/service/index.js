import getAxiosInstance from './getAxiosInstance'
import getRequestConfig from './getRequestConfig'
import showLogger from './showLogger'
import handleSuccess from './handleSuccess'
import handleFailure from './handleFailure'

export const defaultNormalizer = response => response

const defaultConfig = {
  config: {
    url: '',
    method: 'GET',
    params: {},
  },
  name: 'SERVICE_NAME',
  currentEnv: process.env.NODE_ENV,
  transformResponse: defaultNormalizer,
  transformRequest: defaultNormalizer,
  withAccessToken: true,
}

export default function getService(customConfig) {
  const apiInfo = Object.setPrototypeOf(customConfig, defaultConfig)

  const callApi = () => {
    const axiosInstance = getAxiosInstance(apiInfo)
    const requestConfig = getRequestConfig(apiInfo)

    showLogger(`${apiInfo.name}_REQUEST`)

    return axiosInstance(requestConfig)
      .then(response => handleSuccess(response, apiInfo))
      .catch(response => handleFailure(response, apiInfo))
  }

  return callApi()
}
