import { useSWRFetcher, useRevalidate } from '@/effects/useSwrFetcher'
import managementApplicationRecordDataUrl, { fetchManagementApplicationRecordData } from '@/api/fetchManagementApplicationRecordData'
import { PAGE_SIZE } from '@/constants/PAGE_SIZE'

export function useManagementApplicationRecordData(values, employeeId, organizationIdByTeam) {
  const initialManagementApplicationRecordData = { applicationRecordList: [] }

  const { data, isFetched: isManagementApplicationRecordDataFetched, revalidate } = useSWRFetcher(
    {
      url: `${managementApplicationRecordDataUrl}${employeeId}`,
      params: {
        employeeId,
        organizationId: organizationIdByTeam,
        pagingIndex: 1,
        pagingSize: PAGE_SIZE,
        startDate: values.startDate,
        endDate: values.endDate,
      },
    },
    fetchManagementApplicationRecordData,
    { shouldRetryOnError: false },
  )

  useRevalidate('isRevalidateEvents', revalidate)

  return {
    applicationRecordData: isManagementApplicationRecordDataFetched ? data : initialManagementApplicationRecordData,
    isManagementApplicationRecordDataFetched,
    revalidate,
  }
}
