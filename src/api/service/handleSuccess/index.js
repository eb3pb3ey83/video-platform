import toPredicateValues from '@/utils/to-predicate-values'
import toCaseKeys from '@/utils/to-case-keys'
import getPredicator from '../getPredicator'
import getOption from '../getOption'
import showLogger from '../showLogger'
import { isEmpty } from 'lodash'
import handleFailure from '../handleFailure/'

export default function handleSuccess(response, apiInfo) {
  const { data } = response
  if (!isEmpty(data.errors)) return handleFailure(response, apiInfo)
  const casedData = toCaseKeys(response.data, getOption().toResponseCase)
  const isDownloadData = response.headers['content-disposition']

  const transformedResponse = apiInfo.transformResponse(casedData)
  const predicatedResponse = toPredicateValues(transformedResponse, getPredicator())

  if (isDownloadData) {
    response.data = new Blob([response.data], { type: response.headers['content-type'] })

    showLogger(`${apiInfo.name}_SUCCESS`, response)
    return response
  }

  showLogger(`${apiInfo.name}_SUCCESS`, predicatedResponse)
  return predicatedResponse
}
