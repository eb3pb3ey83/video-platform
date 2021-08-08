import { useState, useEffect, useRef } from 'react'
import { useSWRFetcher, useRevalidate } from '@/effects/useSwrFetcher'
import activityMediaUrl, { fetchActivityMedia } from '@/api/fetchActivityMedia'
import { PAGE_SIZE } from '@/constants/PAGE_SIZE'
import { initialFormikValues } from '../../components/ActivityInfoFormik/formikConfig'

export function useActivityMedia(eventId) {
  const initialValues = { hasMore: false, mediaList: [], currentTime: '' }

  const [newParams, setNewParams] = useState(() => initialFormikValues)

  const [currentPage, setCurrentPage] = useState(1)
  const [isFirstFetch, setIsFirstFetch] = useState(true)
  const [fetchDataStatus, setFetchDataStatus] = useState('mediaType')
  const [currentMediaList, setCurrentMediaList] = useState([])

  const paramsRef = useRef(initialFormikValues)

  const mediaListRef = useRef([])

  const { data, isFetched: isActivityMediaFetched, revalidate } = useSWRFetcher(
    {
      url: `${activityMediaUrl}${eventId}`,
      params: {
        pageSize: PAGE_SIZE,
        pageIndex: 1,
        eventId,
        ...newParams,
      },
    },
    fetchActivityMedia,
  )

  useEffect(() => {
    if (data) {
      setIsFirstFetch(false)
    }
  }, [data])

  // 第一次 fetch 時把 data 存入 mediaListRef
  useEffect(() => {
    if (isFirstFetch) {
      mediaListRef.current = data?.mediaList
      setCurrentMediaList(data?.mediaList)
    }
  }, [data, isFirstFetch])

  // 根據不同 call 的情境，做不同的事
  // loadmore 時將目前的資料跟 API 來的新資料串在一起
  // mediaType 跟 search 時則是將目前的資料設定為 API 來的新資料
  useEffect(() => {
    if (data) {
      switch (fetchDataStatus) {
        case 'loadmore':
          setCurrentMediaList(currentMediaList.concat(data?.mediaList))
          setFetchDataStatus('')
          break
        case 'mediaType':
          setCurrentMediaList(data?.mediaList)
          break
      }
    }
  }, [currentMediaList, data, fetchDataStatus])

  // media type click 不考慮 click search 後的任何 filter 條件變動
  // 所以每次 clcik search 時要把當下的 formikValues (paramsRef) 存起來
  const onMediaTypeClick = mediaType => {
    paramsRef.current = { ...paramsRef.current, mediaType: mediaType }

    setNewParams({ ...paramsRef.current, mediaType: mediaType })
    setFetchDataStatus('mediaType')
    setCurrentPage(1)
  }

  // load more click 不考慮 click search 後的任何 filter 條件變動
  // 所以每次 clcik search 時要把當下的 formikValues (paramsRef) 存起來
  const onLoadMoreClick = () => {
    paramsRef.current = { ...paramsRef.current }

    setNewParams({ ...paramsRef.current, pageIndex: currentPage + 1 })
    setCurrentPage(currentPage + 1)
    setFetchDataStatus('loadmore')
  }

  useRevalidate('isRevalidateMedia', revalidate)

  return {
    activityMedia: { hasMore: data?.hasMore, mediaList: currentMediaList, currentTime: data?.currentTime } || initialValues,
    isActivityMediaFetched,
    onMediaTypeClick,
    onLoadMoreClick,
  }
}
