export function getTotalListHeight(uploadItems) {
  const totalListHeight = uploadItems.reduce((currentHeight, item) => {
    const isUploadFailed = item.uploadState.isUploadFailed
    const itemHeight = isUploadFailed ? 69 : 48

    return currentHeight + itemHeight
  }, 0)

  return totalListHeight
}
