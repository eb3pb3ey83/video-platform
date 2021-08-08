import { useEffect } from 'react'
import { useGlobalState } from '@/globalState'
import { sendFileChunk } from '../methods/sendFileChunk'

const currentUploadState = {}
const currentUploadedChunkLength = {}
const currentUploadId = {}

export function useUploadRequestSender(uploadItemData = {}) {
  const { mediaId, mediaCreatedTime, fileSize, formikData, uploadId, uploadState, fileChunkList, md5, uploadedChunkLength } = uploadItemData
  const [, dispatch] = useGlobalState()

  useEffect(() => {
    if (!md5) return

    currentUploadState[mediaId] = uploadState

    if (!uploadState.isUploading) return

    sendFileChunk({ mediaId, mediaCreatedTime, fileSize, dispatch, fileChunkList, md5, formikData })
  }, [uploadState, mediaId, mediaCreatedTime, fileSize, dispatch, fileChunkList, md5, formikData])

  useEffect(() => {
    currentUploadedChunkLength[mediaId] = uploadedChunkLength
  }, [uploadedChunkLength, mediaId])

  useEffect(() => {
    currentUploadId[mediaId] = uploadId
  }, [uploadId, mediaId])
}

export function getCurrentUploadState(mediaId) {
  return currentUploadState[mediaId]
}

export function getCurrentUploadedChunkLength(mediaId) {
  return currentUploadedChunkLength[mediaId]
}

export function getCurrentUploadId(mediaId) {
  return currentUploadId[mediaId]
}
