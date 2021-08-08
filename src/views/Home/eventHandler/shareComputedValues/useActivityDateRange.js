import { useSWRFetcher } from '@/effects/useSwrFetcher'
import activityDateRangeUrl, { fetchActivityDateRange } from '@/api/fetchActivityDateRange'

export function useActivityDateRange(params = {}) {
  const initialActivityDateRange = { activityStartDate: '', activityEndDate: '' }

  const { data, isFetched: isActivityDateRangeFetched } = useSWRFetcher(
    {
      url: activityDateRangeUrl,
      params: {},
    },
    fetchActivityDateRange,
  )

  return { activityDateRange: isActivityDateRangeFetched ? data : initialActivityDateRange, isActivityDateRangeFetched }
}
