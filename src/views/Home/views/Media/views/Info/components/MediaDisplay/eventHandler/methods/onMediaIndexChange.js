export function onMediaIndexChange(history, currentMediaId) {
  const mediaIdList = JSON.parse(window.localStorage.getItem('mediaIdList'))

  const currentMediaIndex = mediaIdList.indexOf(currentMediaId)
  const preiousMediaIndex = currentMediaIndex - 1
  const preiousMediaId = mediaIdList[preiousMediaIndex]
  const nextMediaIndex = currentMediaIndex + 1
  const nextMediaId = mediaIdList[nextMediaIndex]

  const handleChangeMedia = (event, hasMedia) => {
    if (!hasMedia) return

    const selectedMediaId = event.currentTarget.dataset.id

    history.push(`/home/media/${selectedMediaId}/info`)
  }

  return { preiousMediaId, nextMediaId, handleChangeMedia, hasPreviousMedia: Boolean(preiousMediaId), hasNextMedia: Boolean(nextMediaId) }
}
