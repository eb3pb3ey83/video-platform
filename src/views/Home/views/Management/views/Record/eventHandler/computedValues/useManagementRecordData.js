import { useSWRFetcher, useRevalidate } from '@/effects/useSwrFetcher'
import managementRecordDataUrl, { fetchManagementRecordData } from '@/api/fetchManagementRecordData'
import { PAGE_SIZE } from '@/constants/PAGE_SIZE'

export function useManagementRecordData(values) {
  const initialManagementRecordData = { recordList: [] }

  const { data, isFetched: isManagementRecordDataFetched, revalidate } = useSWRFetcher(
    {
      url: managementRecordDataUrl,
      params: {
        pagingIndex: 1,
        pagingSize: PAGE_SIZE,
        startDate: values.startDate,
        endDate: values.endDate,
      },
    },
    fetchManagementRecordData,
    { shouldRetryOnError: false },
  )

  useRevalidate('isRevalidateRecords', revalidate)

  return {
    recordData: isManagementRecordDataFetched ? data : initialManagementRecordData,
    isManagementRecordDataFetched,
    revalidate,
  }
}
