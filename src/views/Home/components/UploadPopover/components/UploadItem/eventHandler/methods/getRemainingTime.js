export function getRemainingTime(uploadedSize, mediaCreatedTime, fileSize) {
  const secondsElapsed = (new Date().getTime() - mediaCreatedTime) / 1000
  const bytesPerSecond = uploadedSize / secondsElapsed
  const remainingBytes = fileSize - uploadedSize
  const secondsRemaining = remainingBytes / bytesPerSecond

  return secondsRemaining
}
