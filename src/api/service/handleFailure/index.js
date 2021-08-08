import isUndefined from 'lodash/fp/isUndefined'
import toCaseKeys from '@/utils/to-case-keys'
import getOption from '../getOption'
import handleUnauthenticated from './handleUnauthenticated'
import getErrorMessage from './getErrorMessage'
import authConfig from '@/authConfig'
import showLogger from '../showLogger'
import debug from './debug'

export default function handleFailure(error, apiInfo) {
  showLogger(`${apiInfo.name}_FAILURE`, error)

  let reason = null

  if (!isUndefined(error.response)) {
    const { response } = error
    const message = getErrorMessage(response, apiInfo)
    const casedError = toCaseKeys(error, getOption().toResponseCase)
    const isUnauthorized = response.status === 401

    if (isUnauthorized) authConfig.logOut()

    reason = { error: casedError, message, ...response }

    debug(reason, apiInfo)
    handleUnauthenticated(reason)
  } else {
    reason = error
  }

  return Promise.reject(reason)
}
