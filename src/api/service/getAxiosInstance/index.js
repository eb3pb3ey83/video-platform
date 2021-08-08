import axios from 'axios'
import authConfig from '@/authConfig'

export default function getAxiosInstance(apiInfo) {
  const withAccessTokenHeader = {
    headers: { Authorization: `bearer ${authConfig.getAccessToken()}` },
  }

  const apiConfig = {
    baseURL: process.env[`API_${process.env.NODE_ENV.toUpperCase()}_URL`],
    ...(apiInfo.withAccessToken && withAccessTokenHeader),
  }

  return axios.create(apiConfig)
}
