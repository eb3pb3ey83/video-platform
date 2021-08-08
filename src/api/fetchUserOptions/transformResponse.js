export default ({ list }) => {
  return list.map(item => ({
    label: `${item.empName} ${item.empId}`,
    value: item,
  }))
}
