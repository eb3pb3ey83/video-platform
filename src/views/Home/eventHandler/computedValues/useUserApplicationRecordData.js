import { useSWRFetcher } from '@/effects/useSwrFetcher'
import userApplicationRecordDataUrl, { fetchUserApplicationRecordData } from '@/api/fetchUserApplicationRecordData'
import { getCurrentOrganization } from '@/utils/getUserInfo'

export function useUserApplicationRecordData() {
  const employeeId = window.localStorage.getItem('userId')

  const currentOrganization = getCurrentOrganization()

  const { data, isFetched: isUserApplicationRecordDataFetched } = useSWRFetcher(
    {
      url: `${userApplicationRecordDataUrl}${employeeId}/approved`,
      params: {
        employeeId,
        organizationId: currentOrganization?.organizationIdByTeam,
      },
      shouldFetch: Boolean(currentOrganization?.organizationIdByTeam),
    },
    fetchUserApplicationRecordData,
  )

  return {
    hasApplicationRecordData: isUserApplicationRecordDataFetched ? data : false,
  }
}
