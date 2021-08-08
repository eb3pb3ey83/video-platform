import { useState, useEffect, useRef } from 'react'
import { useSWRFetcher, useRevalidate } from '@/effects/useSwrFetcher'
import activityEventsUrl, { fetchActivityEvents } from '@/api/fetchActivityEvents'
import { PAGE_SIZE } from '@/constants/PAGE_SIZE'

export function useActivityEvents(values) {
  const [currentPage, setCurrentPage] = useState(1)
  const [isFirstFetch, setIsFirstFetch] = useState(true)
  const [fetchDataStatus, setFetchDataStatus] = useState('')
  const [currentActivityEventsList, setCurrentActivityEventsList] = useState([])

  const activityEventListRef = useRef([])

  const { data, isFetched: isActivityEventsFetched, revalidate } = useSWRFetcher(
    {
      url: activityEventsUrl,
      params: {
        pageIndex: currentPage,
        pageSize: PAGE_SIZE,
        startDate: values.startDate,
        endDate: values.endDate,
        organizationId: values.organizationId,
        placeId: values.placeId,
        eventId: values.eventId,
        isDescending: values.isDescending,
        sortBy: values.sortBy,
      },
    },
    fetchActivityEvents,
    { shouldRetryOnError: false },
  )

  useEffect(() => {
    if (values) {
      setCurrentPage(1)
      setFetchDataStatus('search')
    }
  }, [values])

  useEffect(() => {
    if (data) {
      setIsFirstFetch(false)
    }
  }, [data])

  // 第一次 fetch 時把 data 存入 activityEventsListRef
  useEffect(() => {
    if (isFirstFetch) {
      activityEventListRef.current = data?.activityEvents
      setCurrentActivityEventsList(data?.activityEvents)
    }
  }, [data, isFirstFetch])

  // loadmore 時將目前的資料跟 API 來的新資料串在一起
  useEffect(() => {
    if (data) {
      switch (fetchDataStatus) {
        case 'loadmore':
          setCurrentActivityEventsList(currentActivityEventsList.concat(data?.activityEvents))
          setFetchDataStatus('')
          break
        case 'search':
          setCurrentActivityEventsList(data?.activityEvents)
          break
      }
    }
  }, [currentActivityEventsList, data, fetchDataStatus])

  const onLoadMoreClick = () => {
    setFetchDataStatus('loadmore')
    setCurrentPage(currentPage + 1)
  }

  useRevalidate('isRevalidateEvents', revalidate)

  return {
    activityData: { hasMore: data?.hasMore || false, activityEvents: currentActivityEventsList || [] },
    isActivityEventsFetched,
    revalidate,
    onLoadMoreClick,
  }
}
