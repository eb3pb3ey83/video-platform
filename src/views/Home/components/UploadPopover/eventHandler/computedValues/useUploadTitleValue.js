export function useUploadTitleValue(uploadItems, uploadListState) {
  if (uploadListState === 'pending') return

  const handleUploadingTitle = () => {
    const uploadingLength = uploadItems.filter(item => item.uploadState.isUploading).length

    return `${uploadingLength} 個媒體上傳中...`
  }

  const handleUploadFailedTitle = () => {
    const uploadFailedLength = uploadItems.filter(item => item.uploadState.isUploadFailed).length

    return `${uploadFailedLength} 個媒體上傳失敗`
  }

  const handleAllUploadSuccessTitle = () => `${uploadItems.length} 個媒體已上傳完成`

  const titles = {
    uploading: handleUploadingTitle,
    someItemFailed: handleUploadFailedTitle,
    allItemSuccess: handleAllUploadSuccessTitle,
  }

  return titles[uploadListState]()
}
