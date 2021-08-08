import { useSWRFetcher } from '@/effects/useSwrFetcher'
import keyWordOptionsUrl, { fetchKeyWordOptions } from '@/api/fetchKeyWordOptions'

export function useKeyWordOptions(params) {
  const { data, isFetched: isKeyWordOptionsFetched } = useSWRFetcher(
    {
      url: keyWordOptionsUrl,
      params: {
        categoryId: 1, // 關鍵字的 categoryId 為 1
        all: false,
      },
    },
    fetchKeyWordOptions,
  )

  return { keyWordOptions: data, isKeyWordOptionsFetched }
}
