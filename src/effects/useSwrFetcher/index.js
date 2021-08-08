import { useEffect, useMemo } from 'react'
import useSWRPlugin from 'swr'
import { isEmpty } from 'lodash'
import { useGlobalState } from '@/globalState'

function useDependency(callback, params) {
  const paramsValueList = Object.values(params)

  return useMemo(callback, paramsValueList)
}

export function useSWRFetcher({ url, params = {}, shouldFetch = true }, fetcher, options) {
  const memorizedParams = useDependency(() => params, params)
  const config = isEmpty(params) ? url : [url, memorizedParams]

  const { data, error, revalidate } = useSWRPlugin(shouldFetch ? config : null, fetcher, { revalidateOnFocus: false, ...options })

  return { data, error, isFetching: !data, isFetched: Boolean(data), hasError: Boolean(error), revalidate }
}

export function useRevalidate(validateKey, revalidate) {
  const [state] = useGlobalState()
  const { apiResponse } = state
  const isRevalidate = apiResponse[validateKey]

  useEffect(() => {
    if (isRevalidate) revalidate()
  }, [revalidate, isRevalidate])
}
