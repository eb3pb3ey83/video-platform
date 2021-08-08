import { isEmpty, cloneDeep } from 'lodash'
import { start } from './start-flow'

export function removeObjectEmptyValue(object) {
  const getNewObject = start(() => cloneDeep(object))
    .next(object =>
      Object.entries(object).filter(([key, value]) => {
        const isNumber = typeof value === 'number'

        if (isNumber) return value

        return !isEmpty(value)
      }),
    )
    .end(array => Object.fromEntries(array))

  return getNewObject()
}
