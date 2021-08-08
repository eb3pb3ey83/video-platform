import { useSWRFetcher } from '@/effects/useSwrFetcher'
import placeOptionsUrl, { fetchPlaceOptions } from '@/api/fetchPlaceOptions'

export function usePlaceOptions(params = {}) {
  const { hasAll } = params

  const { data, isFetched: isPlaceOptionsFetched } = useSWRFetcher(
    {
      url: placeOptionsUrl,
      params: { hasAll },
    },
    fetchPlaceOptions,
  )

  return { placeOptions: data, isPlaceOptionsFetched }
}
