import { types as assetUploadTypes } from '@/globalState/reducers/assetUpload'
import { getCurrentUploadingItem } from './getCurrentUploadingItem'

export function updateUploadingItem(itemId, dispatch, updateProps) {
  const newAssetUploaditem = {
    ...getCurrentUploadingItem(itemId),
    ...updateProps,
  }

  dispatch({
    type: assetUploadTypes.SET_ASSET_UPLOAD_LIST,
    uploadingItem: { [itemId]: newAssetUploaditem },
  })
}
