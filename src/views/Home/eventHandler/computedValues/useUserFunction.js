import { useEffect } from 'react'
import { useSWRFetcher } from '@/effects/useSwrFetcher'
import userFunctionUrl, { fetchUserFunction } from '@/api/fetchUserFunction'
import { useGlobalState } from '@/globalState'
import { types as userTypes } from '@/globalState/reducers/user'

export function useUserFunction() {
  const [, dispatch] = useGlobalState()
  const initialUserFunction = { authority: {} }
  const currentOrganization = JSON.parse(window.localStorage.getItem('currentOrganization'))

  const { data, isFetched: isUserFunctionFetched } = useSWRFetcher(
    {
      url: userFunctionUrl,
      params: {
        departmentId: currentOrganization?.departmentId,
        teamId: currentOrganization?.teamId,
      },
      shouldFetch: Boolean(currentOrganization),
    },
    fetchUserFunction,
  )

  useEffect(() => {
    if (isUserFunctionFetched) dispatch({ type: userTypes.SET_USER_AUTHORITY, userAuthority: { ...data } })
  }, [data, dispatch, isUserFunctionFetched])

  return { userFunctionData: isUserFunctionFetched ? data : initialUserFunction, isUserFunctionFetched }
}
