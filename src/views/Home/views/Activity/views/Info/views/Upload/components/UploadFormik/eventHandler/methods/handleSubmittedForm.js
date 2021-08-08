import { uniqueId } from 'lodash'
import { getFileChunkList } from './getFileChunkList'
import { uploading } from '@/globalState/reducers/assetUpload'
import { updateUploadingItem } from '@/views/Home/eventHandler/shareMethods/updateUploadingItem'
import { setMd5 } from './setMd5'

export function handleSubmittedForm({ file, ...formikData }, dispatch) {
  const chunkSize = 100000
  const mediaId = uniqueId('mediaFile')
  const fileChunkList = getFileChunkList(file, chunkSize)

  updateUploadingItem(mediaId, dispatch, {
    mediaId,
    mediaCreatedTime: new Date().getTime(),
    uploadedChunkLength: 0,
    name: file.name,
    fileSize: file.size,
    uploadState: uploading,
    fileChunkList,
    formikData,
  })

  setMd5({ mediaId, fileChunkList, dispatch })
}
