import { useSWRFetcher, useRevalidate } from '@/effects/useSwrFetcher'
import activityInfoUrl, { fetchActivityInfo } from '@/api/fetchActivityInfo'

export function useActivityInfo(eventId) {
  const { data, isFetched: isActivityInfoFetched, revalidate } = useSWRFetcher(
    {
      url: `${activityInfoUrl}${eventId}`,
    },
    fetchActivityInfo,
  )

  useRevalidate('isRevalidateActivityInfo', revalidate)

  return { activityInfo: data, isActivityInfoFetched }
}
