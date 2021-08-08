import { isEmpty, isUndefined } from 'lodash'

export function getTotalListHeight(eventList, errors) {
  const totalListHeight = eventList.reduce((currentHeight, currentField, index) => {
    const hasError = !isUndefined(errors) && !isEmpty(errors[index])

    const itemHeight = hasError ? 71 : 52

    return currentHeight + itemHeight
  }, 0)

  return totalListHeight
}
