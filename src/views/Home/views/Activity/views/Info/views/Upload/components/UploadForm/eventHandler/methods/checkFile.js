// constants
import { MAXIMUM_FILE_SIZE_IN_BYTES } from '../../../../../constants'

const getExtension = fileName => {
  const parts = fileName.split('.')
  return parts[parts.length - 1]
}

const isVideo = file => {
  const { type } = file

  const typeRex = /^video\//
  const isVideo = Boolean(type.match(typeRex))

  return isVideo
}

const isValidFile = file => {
  const { name } = file
  const extension = getExtension(name)

  switch (extension.toLowerCase()) {
    case 'txt':
    case 'exe':
      return false
  }
  return true
}

const isValidSize = file => {
  const { size } = file
  // const fileUploadMaxSizeInBytes = 1024 * 1024 * 1024 * 2 // maximum file size of 2GB

  return size < MAXIMUM_FILE_SIZE_IN_BYTES
}

const getFileUrl = file => {
  const fileUrl = window.URL.createObjectURL(file)

  return fileUrl
}

// 檢查是否重複檔案（檔名相同"且"檔案尺寸也相同）
const isUniqueFile = (lastFiles, file) => {
  const hasSameFile = lastFiles.some(item => item.name === file.name && item.size === file.size)

  return !hasSameFile
}

export { isVideo, isValidFile, isValidSize, getFileUrl, isUniqueFile }
