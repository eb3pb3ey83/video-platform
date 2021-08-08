export default placeOptions => {
  return placeOptions.map(option => {
    const isTaiwan = option.placeNameCh === '台灣'

    return {
      label: isTaiwan ? `${option.placeNameCh}/臺灣 (${option.placeNameEn})` : `${option.placeNameCh} (${option.placeNameEn})`,
      value: option.placeId || 'all',
    }
  })
}
