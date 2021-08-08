import { compareAsc, compareDesc } from 'date-fns'
import _get from 'lodash/get'

export default function sortListByDate(array, keyName, type = 'asc') {
  const compareFunction = type === 'asc' ? compareAsc : type === 'desc' && compareDesc

  return array.sort((objA, objB) => compareFunction(_get(objA, keyName), _get(objB, keyName)))
}
