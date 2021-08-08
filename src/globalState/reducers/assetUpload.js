import { cloneDeep } from 'lodash'
import { createReducer } from '../helpers/createReducer'

export const types = {
  DELETE_ASSET_UPLOAD_ITEM: 'DELETE_ASSET_UPLOAD_ITEM',
  SET_ASSET_UPLOAD_LIST: 'SET_ASSET_UPLOAD_LIST',
  CLEAR_UPLOAD_LIST: 'CLEAR_UPLOAD_LIST',
}

export const uploadSuccess = { isUploadSuccess: true }
export const uploadFailed = { isUploadFailed: true }
export const uploading = { isUploading: true }

const initState = {
  assetUploadList: {},
}

function setAssetUploadList(state, action) {
  return {
    ...state,
    assetUploadList: {
      ...state.assetUploadList,
      ...action.uploadingItem,
    },
  }
}

function deleteAssetUploadItem(state, action) {
  const clonedAssetUploadList = cloneDeep(state.assetUploadList)

  delete clonedAssetUploadList[action.mediaId]

  return {
    ...state,
    assetUploadList: clonedAssetUploadList,
  }
}

function clearUploadList(state, action) {
  return {
    ...state,
    assetUploadList: initState.assetUploadList,
  }
}

const reducer = createReducer(initState, {
  [types.SET_ASSET_UPLOAD_LIST]: setAssetUploadList,
  [types.DELETE_ASSET_UPLOAD_ITEM]: deleteAssetUploadItem,
  [types.CLEAR_UPLOAD_LIST]: clearUploadList,
})

export default reducer
