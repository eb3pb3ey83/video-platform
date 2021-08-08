import { useSWRFetcher, useRevalidate } from '@/effects/useSwrFetcher'
import maintenanceCategoryListUrl, { fetchMaintenanceICategoryList } from '@/api/fetchMaintenanceCategoryList'

export function useMaintenanceCategoryListData() {
  const initialMaintenanceCategoryListData = { maintenanceCategoryList: [] }

  const { data, isFetched: isMaintenanceCategoryListDataFetched, revalidate } = useSWRFetcher(
    {
      url: maintenanceCategoryListUrl,
      params: {},
    },
    fetchMaintenanceICategoryList,
  )

  useRevalidate('isRevalidateEvents', revalidate)

  return {
    maintenanceCategoryListData: isMaintenanceCategoryListDataFetched ? data : initialMaintenanceCategoryListData,
    isMaintenanceCategoryListDataFetched,
    revalidate,
  }
}
