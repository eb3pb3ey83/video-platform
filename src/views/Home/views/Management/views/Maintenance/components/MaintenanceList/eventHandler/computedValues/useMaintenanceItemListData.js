import { useSWRFetcher, useRevalidate } from '@/effects/useSwrFetcher'
import maintenanceItemListUrl, { fetchMaintenanceItemList } from '@/api/fetchMaintenanceItemList'

export function useMaintenanceItemListData(params, shouldFetch) {
  const { categoryId, all } = params
  const initialMaintenanceItemListData = { maintenanceItemList: [] }

  const { data: maintenanceItemListData, isFetched: isMaintenanceItemListDataFetched, revalidate } = useSWRFetcher(
    {
      url: maintenanceItemListUrl,
      params: {
        categoryId,
        all,
      },
      shouldFetch,
    },
    fetchMaintenanceItemList,
  )

  useRevalidate('isRevalidateEvents', revalidate)

  return {
    maintenanceItemListData: isMaintenanceItemListDataFetched ? maintenanceItemListData : initialMaintenanceItemListData,
    isMaintenanceItemListDataFetched,
    revalidate,
  }
}
