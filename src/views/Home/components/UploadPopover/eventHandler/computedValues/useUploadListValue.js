import { useGlobalState } from '@/globalState'

export function useUploadListValue() {
  const [state] = useGlobalState()
  const { assetUpload } = state
  const { assetUploadList } = assetUpload

  return {
    uploadList: assetUploadList,
    uploadItems: Object.values(assetUploadList),
  }
}
