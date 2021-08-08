export function redirectToInfo(event, history, eventId, mediaList) {
  const mediaInfo = { eventId }

  window.sessionStorage.setItem('mediaInfo', JSON.stringify(mediaInfo))

  const mediaId = event.currentTarget.dataset.id

  const mediaIdList = mediaList.map(item => item.mediaId)

  window.localStorage.setItem('mediaIdList', JSON.stringify(mediaIdList))

  history.push(`/home/media/${mediaId}/info`)
}
