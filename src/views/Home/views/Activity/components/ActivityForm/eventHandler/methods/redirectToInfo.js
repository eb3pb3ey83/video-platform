export function redirectToInfo({ event, match, handleOriginal, history }) {
  const currentTd = event.target
  const { rowType, eventId } = currentTd.dataset

  if (typeof handleOriginal === 'function') {
    handleOriginal()
  }

  if (rowType === 'object') {
    history.push(`${match.url}/${Number(eventId)}/info`)
  }
}
