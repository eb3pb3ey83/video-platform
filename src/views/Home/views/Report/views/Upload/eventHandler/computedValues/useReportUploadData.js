import { useSWRFetcher, useRevalidate } from '@/effects/useSwrFetcher'
import reportUploadDataUrl, { fetchReportUploadData } from '@/api/fetchReportUploadData'
import { PAGE_SIZE } from '@/constants/PAGE_SIZE'

export function useReportUploadData(values) {
  const initialReportUploadData = { reportList: [], eventAmount: 0, imageAmount: 0, videoAmount: 0 }

  const { data, isFetched: isReportUploadDataFetched, revalidate } = useSWRFetcher(
    {
      url: reportUploadDataUrl,
      params: {
        pageIndex: 1,
        pageSize: PAGE_SIZE,
        startDate: values.startDate,
        endDate: values.endDate,
        organizationId: values.organizationId,
        isDescending: values.isDescending,
        sortBy: values.sortBy,
      },
    },
    fetchReportUploadData,
    { shouldRetryOnError: false },
  )

  useRevalidate('isRevalidateEvents', revalidate)

  return {
    reportData: isReportUploadDataFetched ? data : initialReportUploadData,
    isReportUploadDataFetched,
    revalidate,
  }
}
