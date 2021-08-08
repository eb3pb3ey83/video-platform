import { useSWRFetcher, useRevalidate } from '@/effects/useSwrFetcher'
import mediaInfoUrl, { fetchMediaInfo } from '@/api/fetchMediaInfo'
import { getCurrentOrganization } from '@/utils/getUserInfo'

export function useMediaInfo(attachmentId) {
  const initialMediaInfo = { downloadData: {}, viewData: {}, editData: {}, currentTime: '' }
  const { organizationIdByTeam: organizationId } = getCurrentOrganization()

  const { data, isFetched: isMediaInfoFetched, revalidate } = useSWRFetcher(
    {
      url: `${mediaInfoUrl}${attachmentId}`,
      params: { attachmentId, organizationId },
    },
    fetchMediaInfo,
  )
  useRevalidate('isRevalidateMediaInfo', revalidate)
  return { mediaInfo: isMediaInfoFetched ? data : initialMediaInfo, isMediaInfoFetched }
}
