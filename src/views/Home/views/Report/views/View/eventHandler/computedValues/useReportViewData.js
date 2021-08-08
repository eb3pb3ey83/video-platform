import { useSWRFetcher, useRevalidate } from '@/effects/useSwrFetcher'
import reportViewDataUrl, { fetchReportViewData } from '@/api/fetchReportViewData'
import { PAGE_SIZE } from '@/constants/PAGE_SIZE'

export function useReportViewData(values) {
  const initialReportViewData = { viewList: [], totalAmount: 0 }

  const { data, isFetched: isReportViewDataFetched, revalidate } = useSWRFetcher(
    {
      url: reportViewDataUrl,
      params: {
        pageIndex: 1,
        pageSize: PAGE_SIZE,
        startDate: values.startDate,
        endDate: values.endDate,
        organizationId: values.organizationId,
      },
    },
    fetchReportViewData,
    { shouldRetryOnError: false },
  )

  useRevalidate('isRevalidateEvents', revalidate)

  return {
    viewData: isReportViewDataFetched ? data : initialReportViewData,
    isReportViewDataFetched,
    revalidate,
  }
}
