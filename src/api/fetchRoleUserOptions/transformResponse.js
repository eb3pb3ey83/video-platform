export default roleUserOptions => {
  return roleUserOptions.list.map(option => {
    return {
      label: `${option.user.empName}(${option.user.jobDesc})`,
      value: JSON.stringify(option),
    }
  })
}
