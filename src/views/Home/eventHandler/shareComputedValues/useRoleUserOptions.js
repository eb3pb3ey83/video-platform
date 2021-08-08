import { useSWRFetcher } from '@/effects/useSwrFetcher'
import roleUserOptionsUrl, { fetchRoleUserOptions } from '@/api/fetchRoleUserOptions'

export function useRoleUserOptions(params = {}) {
  const { hasAll } = params

  const { data, isFetched: isRoleUserOptionsFetched } = useSWRFetcher(
    {
      url: roleUserOptionsUrl,
      params: { hasAll },
    },
    fetchRoleUserOptions,
  )
  return { roleUserOptions: data, isRoleUserOptionsFetched }
}
