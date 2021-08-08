import SparkMD5 from 'spark-md5'
import { updateUploadingItem } from '@/views/Home/eventHandler/shareMethods/updateUploadingItem'

const sparkList = {}

export function setMd5({ mediaId, fileChunkList, dispatch }, itemCount = 0) {
  const reader = new FileReader()

  const file = fileChunkList[itemCount].file
  const isLastChunk = itemCount === fileChunkList.length - 1

  if (!sparkList[mediaId]) {
    sparkList[mediaId] = new SparkMD5.ArrayBuffer()
  }

  reader.readAsArrayBuffer(file)
  reader.onload = event => {
    const currentSpark = sparkList[mediaId]

    currentSpark.append(event.target.result)

    if (isLastChunk) {
      const md5 = currentSpark.end()

      updateUploadingItem(mediaId, dispatch, { md5 })
    } else {
      itemCount++
      setMd5({ mediaId, fileChunkList, dispatch }, itemCount)
    }
  }

  return fileChunkList
}
