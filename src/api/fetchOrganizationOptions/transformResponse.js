import { findIndex } from 'lodash'

export default list => {
  const newList = list
    .map(item => {
      return {
        label: item.deptName,
        value: item.orgId,
        departmentId: item.deptId,
      }
    })
    .filter((element, index, array) => {
      return findIndex(array, element) === index
    })

  newList.unshift({ label: '全單位', value: 'all' }) // 後端沒有給全單位，要自己放進去

  return newList
}
