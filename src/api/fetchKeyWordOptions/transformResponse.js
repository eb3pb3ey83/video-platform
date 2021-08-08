export default keyWordOptions => {
  return keyWordOptions.map(option => {
    return {
      label: option.itemName,
      value: option.itemId || 'all',
    }
  })
}
