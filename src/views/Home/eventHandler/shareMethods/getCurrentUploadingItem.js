import { getUploadList } from '@/views/Home/eventHandler/shareComputedValues/useUploadListState'

export function getCurrentUploadingItem(itemId) {
  const oldUploadList = getUploadList()

  const currentitem = oldUploadList[itemId]

  return !currentitem ? {} : currentitem
}
