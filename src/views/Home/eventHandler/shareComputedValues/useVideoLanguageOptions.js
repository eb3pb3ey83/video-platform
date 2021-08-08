import { useSWRFetcher } from '@/effects/useSwrFetcher'
import videoLanguageOptionsUrl, { fetchVideoLanguageOptions } from '@/api/fetchVideoLanguageOptions'

export function useVideoLanguageOptions(params = {}) {
  const { hasAll } = params

  const { data, isFetched: isVideoLanguageOptionsFetched } = useSWRFetcher(
    {
      url: videoLanguageOptionsUrl,
      params: { hasAll },
    },
    fetchVideoLanguageOptions,
  )

  return { videoLanguageOptions: data, isVideoLanguageOptionsFetched }
}
