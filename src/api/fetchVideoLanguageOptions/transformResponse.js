export default videoLanguageOptions => {
  return videoLanguageOptions.map(option => {
    return {
      label: option.itemName,
      value: option.itemName,
    }
  })
}
