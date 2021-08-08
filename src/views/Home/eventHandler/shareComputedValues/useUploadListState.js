import { useState, useEffect } from 'react'
import { useGlobalState } from '@/globalState'
import { isEmpty } from 'lodash'
import { startFind } from '@/utils/start-find'
import { types as assetUploadTypes } from '@/globalState/reducers/assetUpload'

const uploadItemState = {
  uplaodList: {},
}

function useUploadListState(uploadList, uploadItems) {
  const [, dispatch] = useGlobalState()
  const [uploadListState, setUploadListState] = useState('pending')
  const [currentUploadList, setCurrentUploadList] = useState(uploadList)

  const setNewUploadList = newUploadList => {
    setCurrentUploadList(newUploadList)
    uploadItemState.uplaodList = newUploadList
  }

  useEffect(() => {
    if (isEmpty(uploadItems)) return

    const handleAllItemSuccess = () => {
      const isAllItemSuccess = uploadItems.every(item => item.uploadState.isUploadSuccess)

      if (!isAllItemSuccess) return

      const clearUploadList = () => dispatch({ type: assetUploadTypes.CLEAR_UPLOAD_LIST })

      setTimeout(clearUploadList, 3000)
      return 'allItemSuccess'
    }

    const handleSomeItemFailed = () => {
      const isSomeItemFailed = uploadItems.some(item => item.uploadState.isUploadFailed)

      if (!isSomeItemFailed) return

      return 'someItemFailed'
    }

    const handleUploading = () => {
      const isUploading = uploadItems.some(item => item.uploadState.isUploading)

      if (!isUploading) return

      return 'uploading'
    }

    const handleUploadListState = startFind(handleAllItemSuccess)
      .next(handleSomeItemFailed)
      .end(handleUploading)

    const currentUploadListState = handleUploadListState()

    setUploadListState(currentUploadListState)
    setNewUploadList(uploadList)
  }, [currentUploadList, uploadList, dispatch, uploadItems])

  return uploadListState
}

export function getUploadList() {
  return uploadItemState.uplaodList
}

export default useUploadListState
