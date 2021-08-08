export function onMediaModalClose(history) {
  const mediaInfoLocalStorage = JSON.parse(window.sessionStorage.getItem('mediaInfo'))

  if (mediaInfoLocalStorage?.eventId) {
    history.push(`/home/activity/${mediaInfoLocalStorage.eventId}/info`)
  } else {
    history.push('/home/media')
  }
  window.sessionStorage.removeItem('mediaInfo')
}
