import toPredicateValues from '@/utils/to-predicate-values'
import toCaseKeys from '@/utils/to-case-keys'
import getOption from './getOption'
import getPredicator from './getPredicator'

export default function getTransformedRequest(response, apiInfo) {
  const casedData = toCaseKeys(response.data, getOption().toResponseCase)
  const normalizedData = apiInfo.transformRequest(casedData)

  return toPredicateValues(normalizedData, getPredicator())
}
