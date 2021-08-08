import { useSWRFetcher, useRevalidate } from '@/effects/useSwrFetcher'
import reportDownloadDataUrl, { fetchReportDownloadData } from '@/api/fetchReportDownloadData'
import { PAGE_SIZE } from '@/constants/PAGE_SIZE'

export function useReportDownloadData(values) {
  const initialReportDownloadData = { downloadList: [], totalAmount: 0 }

  const { data, isFetched: isReportDownloadDataFetched, revalidate } = useSWRFetcher(
    {
      url: reportDownloadDataUrl,
      params: {
        pageIndex: 1,
        pageSize: PAGE_SIZE,
        startDate: values.startDate,
        endDate: values.endDate,
        organizationId: values.organizationId,
      },
    },
    fetchReportDownloadData,
    { shouldRetryOnError: false },
  )

  useRevalidate('isRevalidateEvents', revalidate)

  return {
    downloadData: isReportDownloadDataFetched ? data : initialReportDownloadData,
    isReportDownloadDataFetched,
    revalidate,
  }
}
