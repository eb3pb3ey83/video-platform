import flow from 'lodash/fp/flow'
import omitBy from 'lodash/fp/omitBy'
import mapValues from 'lodash/fp/mapValues'
import isUndefined from 'lodash/fp/isUndefined'
import { startFind } from '@/utils/start-find'

export default function getPredicator() {
  const handleArrayParameter = object => {
    if (!Array.isArray(object)) return

    return object.filter(value => !isUndefined(value))
  }

  const handleObjectParameter = object => {
    if (Array.isArray(object)) return

    return flow(
      omitBy(isUndefined),
      mapValues(value => (typeof value === 'string' ? value.trim() : value)),
    )(object)
  }

  return startFind(handleArrayParameter).end(handleObjectParameter)
}
