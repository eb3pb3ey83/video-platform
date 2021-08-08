import { useState, useEffect } from 'react'

export function useProgressBarValue(uploadItemData) {
  const { uploadState, offset, fileSize } = uploadItemData
  const [progressBarValue, setProgressBarValue] = useState(0)

  useEffect(() => {
    if (!uploadState.isUploading) return

    setProgressBarValue((Number(offset) / Number(fileSize)) * 100)
  }, [uploadState, offset, fileSize])

  return { progressBarValue }
}
