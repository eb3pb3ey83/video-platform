import React, { useState, useEffect } from 'react'
import classnames from 'classnames/bind'
import ProgressBar from '@/basicComponents/ProgressBar'
import Icon from '@/basicComponents/Icon'
import deleteMediaChunkFileUrl, { deleteMediaChunkFile } from '@/api/deleteMediaChunkFile'
import { useGlobalState } from '@/globalState'
import { types as assetUploadTypes, uploading, uploadFailed } from '@/globalState/reducers/assetUpload'
import { updateUploadingItem } from '@/views/Home/eventHandler/shareMethods/updateUploadingItem'

// Style
import styles from '../../style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export function useUploadItemState(progressBarValue, uploadItemData) {
  const [, dispatch] = useGlobalState()
  const { mediaId, uploadState } = uploadItemData
  const [stateName, setStateName] = useState('isUploading')

  const uploadLayoutState = {
    isUploading: {
      icon: <ProgressBar completed={progressBarValue} />,
      onMouseEnterState: 'isUploadingHovered',
    },

    isUploadingHovered: {
      icon: <Icon.Pause />,
      onMouseLeaveState: 'isUploading',
      handleOnClick: () => {
        updateUploadingItem(mediaId, dispatch, {
          uploadState: uploadFailed,
          errorMessage: '檔案尚未上傳成功，請選擇繼續上傳或刪除',
        })
      },
    },

    isUploadSuccess: {
      icon: <Icon.Success className={cx('icon-success')} />,
    },

    isUploadFailed: {
      icon: <Icon.Fail />,
      onMouseEnterState: 'isUploadFailedHovered',
      handleOnDelete: () => {
        deleteMediaChunkFile(`${deleteMediaChunkFileUrl}/${mediaId}`)
        dispatch({ type: assetUploadTypes.DELETE_ASSET_UPLOAD_ITEM, mediaId })
      },
    },

    isUploadFailedHovered: {
      icon: <Icon.Reset />,
      onMouseLeaveState: 'isUploadFailed',
      handleOnClick: () => {
        updateUploadingItem(mediaId, dispatch, {
          uploadState: uploading,
          errorMessage: '',
        })
      },
    },
  }

  useEffect(() => {
    setStateName(Object.keys(uploadState)[0])
  }, [uploadState])

  const currentLayoutState = uploadLayoutState[stateName]

  return { currentLayoutState, setStateName }
}
