import { useSWRFetcher } from '@/effects/useSwrFetcher'
import organizationOptionsUrl, { fetchOrganizationOptions } from '@/api/fetchOrganizationOptions'

export function useOrganizationOptions() {
  const { data, isFetched: isOrganiztionOptionsFetched } = useSWRFetcher(
    {
      url: organizationOptionsUrl,
      params: {},
    },
    fetchOrganizationOptions,
  )

  return { organizationOptions: data, isOrganiztionOptionsFetched }
}
