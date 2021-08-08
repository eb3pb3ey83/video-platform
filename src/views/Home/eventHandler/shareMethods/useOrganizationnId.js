import { useEffect } from 'react'
import organizationListUrl, { fetchOrganizationList } from '@/api/fetchOrganizationList'
import { useGlobalState } from '@/globalState'
import { types as organizationTypes } from '@/globalState/reducers/organization'

export function useOrganizationnId() {
  const [, dispatch] = useGlobalState()

  useEffect(() => {
    fetchOrganizationList(organizationListUrl).then(response => {
      dispatch({
        type: organizationTypes.SET_ORGANIZATION_LIST,
        organizationList: response,
      })
    })
  }, [dispatch])
}
