import { useState, useEffect, useRef } from 'react'
import { useSWRFetcher, useRevalidate } from '@/effects/useSwrFetcher'
import mediaListUrl, { fetchMediaData } from '@/api/fetchMediaData'
import { initialFormikValues } from '../../components/MediaFormik/formikConfig'
import { PAGE_SIZE } from '@/constants/PAGE_SIZE'

export function useMediaData(location) {
  const initialValues = { hasMore: false, mediaList: [], currentTime: '' }

  const [newParams, setNewParams] = useState(() => initialFormikValues)

  const [currentPage, setCurrentPage] = useState(1)
  const [isFirstFetch, setIsFirstFetch] = useState(true)
  const [fetchDataStatus, setFetchDataStatus] = useState('mediaType')
  const [currentMediaList, setCurrentMediaList] = useState([])
  const [isFiltered, setIsFiltered] = useState(false)

  const paramsRef = useRef(initialFormikValues)

  const mediaListRef = useRef([])

  // 如果是在媒體列表才 call API
  // 如果是從活動內層進入媒體內層就不 call API
  const { pathname } = location
  const isMediaPage = pathname === '/home/media'

  const { data, isFetched: isMediaListFetched, revalidate } = useSWRFetcher(
    {
      url: mediaListUrl,
      params: {
        pageIndex: currentPage,
        pageSize: PAGE_SIZE,
        ...newParams,
      },
      shouldFetch: isMediaPage,
    },
    fetchMediaData,
    { shouldRetryOnError: false },
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
        case 'search':
          setCurrentMediaList(data?.mediaList)
          break
      }
    }
  }, [currentMediaList, data, fetchDataStatus])

  // seach 用最新的 filter 條件(formikValues)
  const onSearchClick = (formikValues, currentParams) => {
    paramsRef.current = formikValues

    setNewParams({ ...formikValues, ...currentParams })
    setFetchDataStatus('search')
    setIsFiltered(true)
    setCurrentPage(1)
  }

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
    mediaData:
      {
        hasMore: data?.hasMore,
        mediaList: currentMediaList,
        imageAmount: data?.imageAmount,
        videoAmount: data?.videoAmount,
        currentTime: data?.currentTime,
      } || initialValues,
    isMediaListFetched,
    revalidate,
    onSearchClick,
    onLoadMoreClick,
    onMediaTypeClick,
    isFiltered,
  }
}
