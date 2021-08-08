import { useSWRFetcher } from '@/effects/useSwrFetcher'
import placeOptionsUrl, { fetchActivityTemplateOptions } from '@/api/fetchActivityTemplateOptions'

export function useActivityTemplateOptions() {
  const { data, isFetched: isActivityTemplateOptionsFetched } = useSWRFetcher(
    {
      url: placeOptionsUrl,
      params: {},
    },
    fetchActivityTemplateOptions,
  )

  return { activityTemplateOptions: data, isActivityTemplateOptionsFetched }
}
