export function canVideoPlay(fileType) {
  if (!fileType) return

  fileType = fileType.toLowerCase()

  const canPlayTypes = [/mp4$/, /mov$/] // video.js 目前只播 .mp4, .mov， .webm 也能播，但目前不提供

  const canPlay = Boolean(canPlayTypes.find(acceptType => fileType.match(acceptType)))

  return canPlay
}
