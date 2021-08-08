export function onSortClick(event, sortBy, isDescending, setFieldValue) {
  const selectedSortBy = event.currentTarget.dataset.sort

  if (selectedSortBy === sortBy) {
    switch (isDescending) {
      case null:
        setFieldValue('isDescending', false)
        break
      case false:
        setFieldValue('isDescending', true)
        break
      case true:
        setFieldValue('isDescending', null)
        break
      default:
    }
  } else {
    setFieldValue('isDescending', false)
  }

  setFieldValue('sortBy', selectedSortBy)
}
