import toPredicateValues from '@/utils/to-predicate-values'
import toCaseKeys from '@/utils/to-case-keys'
import isPlainObject from 'lodash/fp/isPlainObject'
import getOption from '../getOption'
import getPredicator from '../getPredicator'

export default function handleParameter(parameter, apiInfo) {
  const objectComparator = value => isPlainObject(value) || Array.isArray(value)
  const transformedParameter = apiInfo.transformRequest(parameter)
  const casedParameter = toCaseKeys(transformedParameter, getOption().toRequestCase, { objectComparator })

  const predicatedParameter = toPredicateValues(casedParameter, getPredicator(), {
    objectComparator,
  })

  return {
    ...predicatedParameter,
    timestamp: new Date().getTime(),
  }
}
