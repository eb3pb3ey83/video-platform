import { setRequestSuccess } from '@/views/Home/eventHandler/shareMethods/useRequest'
import mediaChunkFileUrl, { createMediaChunkFile } from '@/api/createMediaChunkFile'
import mediaFileUrl, { createMediaFile } from '@/api/createMediaFile'
import { uploadFailed, uploadSuccess } from '@/globalState/reducers/assetUpload'
import { updateUploadingItem } from '@/views/Home/eventHandler/shareMethods/updateUploadingItem'
import { getCurrentUploadState, getCurrentUploadedChunkLength, getCurrentUploadId } from '../effect/useUploadRequestSender'
import { getRemainingTime } from './getRemainingTime'

export function sendFileChunk({ mediaId, mediaCreatedTime, fileSize, dispatch, fileChunkList, md5, formikData }) {
  const getResponseData = currentData => {
    const uploadId = getCurrentUploadId(mediaId)

    return {
      ...currentData,
      ...(uploadId && { uploadId }),
    }
  }

  const handleSuccessResponse = response => {
    const { offset, uploadId } = response

    updateUploadingItem(mediaId, dispatch, {
      offset,
      uploadId,
      uploadedChunkLength: getCurrentUploadedChunkLength(mediaId) + 1,
      secondsRemaining: getRemainingTime(offset, mediaCreatedTime, fileSize),
    })
  }

  const handleFailedResponse = () => {
    updateUploadingItem(mediaId, dispatch, {
      uploadState: uploadFailed,
      errorMessage: '檔案尚未上傳成功，請選擇繼續上傳或刪除',
    })
  }

  const handleCreateMediaSuccess = () => {
    setRequestSuccess({
      isRevalidateMedia: true,
    })

    updateUploadingItem(mediaId, dispatch, {
      uploadState: uploadSuccess,
    })
  }

  const createMedia = () => {
    if (getCurrentUploadState(mediaId).isUploadFailed) {
      return Promise.reject(new Error('uploadFailed!'))
    }

    const uploadId = getCurrentUploadId(mediaId)

    createMediaFile(mediaFileUrl, { uploadId, md5, ...formikData })
      .then(handleCreateMediaSuccess)
      .catch(handleFailedResponse)
  }

  fileChunkList
    .slice(getCurrentUploadedChunkLength(mediaId))
    .reduce((promise, currentData) => {
      return promise.then(() => {
        if (getCurrentUploadState(mediaId).isUploadFailed) return

        return createMediaChunkFile(mediaChunkFileUrl, getResponseData(currentData))
          .then(handleSuccessResponse)
          .catch(handleFailedResponse)
      })
    }, Promise.resolve())
    .then(createMedia)
    .catch(handleFailedResponse)
}
